#include <windows.h>

// Function to launch an application and return success status
int launchApplication(char *appCommand) {
    if (appCommand == NULL) {
        return 0; // Fail silently
    }

    HINSTANCE result = ShellExecuteA(NULL, "open", appCommand, NULL, NULL, SW_SHOWNORMAL);
    return (intptr_t)result > 32; // Success if > 32
}

// Window procedure for the square window
LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) {
    switch (msg) {
        case WM_DESTROY:
            PostQuitMessage(0);
            break;
        default:
            return DefWindowProc(hwnd, msg, wParam, lParam);
    }
    return 0;
}

// Create and show a small square window
HWND createSquareWindow(HINSTANCE hInstance) {
    WNDCLASS wc = {0};
    wc.lpfnWndProc = WndProc;
    wc.hInstance = hInstance;
    wc.lpszClassName = "SquareWindowClass";

    if (!RegisterClass(&wc)) {
        return NULL;
    }

    HWND hwnd = CreateWindow(
        "SquareWindowClass",     // Class name
        "",                      // Window title (empty)
        WS_OVERLAPPEDWINDOW,     // Style (minimal)
        CW_USEDEFAULT, CW_USEDEFAULT, // Position
        100, 100,                // Width, Height (small square)
        NULL, NULL,              // Parent, Menu
        hInstance, NULL          // Instance, Param
    );

    if (hwnd) {
        ShowWindow(hwnd, SW_SHOW);
        UpdateWindow(hwnd);
    }
    return hwnd;
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
    FreeConsole(); // Ensure no console

    // Static memory allocation for application commands
    char notepadCommand[] = "notepad.exe"; // Ctrl+Alt+N
    char calcCommand[] = "calc.exe";       // Ctrl+Alt+B

    // Pointers to statically allocated commands
    char *notepadPtr = notepadCommand;
    char *calcPtr = calcCommand;

    HWND hwnd = NULL; // Window handle

    // Main loop
    while (1) {
        // Check for Ctrl+Alt being held
        int ctrlAltPressed = (GetAsyncKeyState(VK_CONTROL) & 0x8000) &&
                            (GetAsyncKeyState(VK_MENU) & 0x8000); // VK_MENU is Alt

        if (ctrlAltPressed) {
            if (GetAsyncKeyState('N') & 0x8000) { // Ctrl+Alt+N
                if (!hwnd) { // Show square if not already shown
                    hwnd = createSquareWindow(hInstance);
                    if (!hwnd) continue; // Skip if window creation fails
                }
                if (launchApplication(notepadPtr)) { // Launch app
                    DestroyWindow(hwnd); // Close square on success
                    hwnd = NULL;
                }
                while (GetAsyncKeyState('N') & 0x8000) {
                    Sleep(10); // Debounce
                }
            } else if (GetAsyncKeyState('B') & 0x8000) { // Ctrl+Alt+B
                if (!hwnd) { // Show square if not already shown
                    hwnd = createSquareWindow(hInstance);
                    if (!hwnd) continue;
                }
                if (launchApplication(calcPtr)) { // Launch app
                    DestroyWindow(hwnd); // Close square on success
                    hwnd = NULL;
                }
                while (GetAsyncKeyState('B') & 0x8000) {
                    Sleep(10); // Debounce
                }
            }
        }

        if (GetAsyncKeyState(VK_ESCAPE) & 0x8000) { // ESC to exit
            if (hwnd) DestroyWindow(hwnd);
            break;
        }

        // Process window messages to keep it responsive
        MSG msg;
        if (PeekMessage(&msg, NULL, 0, 0, PM_REMOVE)) {
            TranslateMessage(&msg);
            DispatchMessage(&msg);
            if (msg.message == WM_QUIT) break; // Exit if window closed manually
        }

        Sleep(10); // Reduce CPU usage
    }

    return 0;
}