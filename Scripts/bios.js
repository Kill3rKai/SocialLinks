const startScreen = document.getElementById("startScreen");
const biosScreen = document.getElementById("biosScreen");
const blackScreen = document.getElementById("blackScreen");
const hardwareScreen = document.getElementById("hardwareScreen");
const windowsScreen = document.getElementById("windowsScreen");

const bios = document.getElementById("bios");
const hardwareText = document.getElementById("hardwareText");
const windowsText = document.getElementById("windowsText");

const bootAudio = document.getElementById("bootAudio");
const beepAudio = document.getElementById("beepAudio");

let started = false;

document.addEventListener("click", () => {
    if (!started) {
        started = true;

        bootAudio.volume = 0.3;
        bootAudio.currentTime = 0;
        bootAudio.play();

        startScreen.style.display = "none";
        biosScreen.style.display = "block";

        startBIOSSequence();
    }
});

// -------------------- BIOS booting --------------------
function startBIOSSequence() {
    const lines = [
        "Phoenix - AwardBIOS v6.00PG, An Energy Star Ally",
        "Copyright (C) 1984 - 2025, Phoenix Technologies, LTD",
        "",
        "Main Processor : Intel Pentium 75 MHz",
        "Memory Testing : 16384K OK",
        "",
        "Primary Master  : WDC AC2850F",
        "Primary Slave   : None",
        "Secondary Master: ATAPI CD-ROM",
        "Secondary Slave : None",
        "",
        "Loading operating system..."
    ];
    typeLinesCinematic(lines, 0, compileSystemFiles);
}

function typeLinesCinematic(lines, index, callback) {
    if (index < lines.length) {
        bios.innerHTML += lines[index] + "\n";
        setTimeout(() => {
            typeLinesCinematic(lines, index+1, callback);
        }, 50 + Math.random()*50);
    } else callback();
}

// -------------------- System files compilation --------------------
function compileSystemFiles() {
    const file = {compilingFinal: "Compiling: COMDLG32.DLL", loadingFinal: "Loading: WIN.INI", swapsCompiling: 5, swapsLoading: 5};

    // --- Compiling line swaps ---
    let compilingDiv = document.createElement("div");
    bios.appendChild(compilingDiv);
    let compSwapCount = 0;
    const swapOptions = ["COMDLG32.DLL","WIN.INI","SYSTEM.INI","KERNEL32.DLL","USER32.DLL","GDI32.DLL","SHELL32.DLL"];

    const compInterval = setInterval(() => {
        const randFile = swapOptions[Math.floor(Math.random()*swapOptions.length)];
        compilingDiv.textContent = "Compiling: " + randFile;
        compSwapCount++;
        if(compSwapCount >= file.swapsCompiling){
            clearInterval(compInterval);
            compilingDiv.textContent = file.compilingFinal;

            // blank line
            bios.innerHTML += "\n";

            // --- Loading line swaps ---
            let loadingDiv = document.createElement("div");
            bios.appendChild(loadingDiv);
            let loadSwapCount = 0;

            const loadInterval = setInterval(() => {
                const randFileLoad = swapOptions[Math.floor(Math.random()*swapOptions.length)];
                loadingDiv.textContent = "Loading: " + randFileLoad;
                loadSwapCount++;
                if(loadSwapCount >= file.swapsLoading){
                    clearInterval(loadInterval);
                    loadingDiv.textContent = file.loadingFinal;

                    // 1s pause, then black screen
                    setTimeout(() => {
                        biosScreen.style.display = "none";
                        blackScreen.style.display = "block";
                        setTimeout(startHardwarePhase, 1000);
                    }, 1000);
                }
            }, 300);
        }
    }, 300);
}

// -------------------- Hardware initialization phase --------------------
function startHardwarePhase() {
    blackScreen.style.display = "none";
    hardwareScreen.style.display = "block";

    // Play beep audio when hardware screen shows
    beepAudio.volume = 0.5;
    beepAudio.currentTime = 0;
    beepAudio.play();

    const lines = [
        "Initializing system hardware...",
        "",
        "Detecting IDE drives...",
        "Scanning: ISA Bus Devices",
        "",
        "Loading device drivers...",
        "Installing: CDROM.SYS"
    ];

    typeHardwareLines(lines, 0);
}

function typeHardwareLines(lines, index) {
    if(index >= lines.length) return;

    const line = lines[index];

    if(line.startsWith("Scanning: ISA Bus Devices")){
        swapArray(line, ["ISA Device 1","ISA Device 2","ISA Device 3","ISA Device 4","ISA Device 5"], 5, () => {
            index++;
            typeHardwareLines(lines, index);
        });
    } else if(line.startsWith("Installing: CDROM.SYS")){
        swapArray(line, ["CDROM.SYS","CDROMDRV.SYS","CDROM2.SYS","CDROM3.SYS","CDROMX.SYS"], 5, () => {
            index++;
            typeHardwareLines(lines, index);
        });
    } else {
        hardwareText.innerHTML += line + "\n";
        setTimeout(() => {
            typeHardwareLines(lines, index+1);
        }, 100 + Math.random()*50);
    }
}

// -------------------- Windows environment phase --------------------
function startWindowsPhase() {
    hardwareScreen.style.display = "none";
    blackScreen.style.display = "block";

    setTimeout(() => {
        blackScreen.style.display = "none";
        windowsScreen.style.display = "block";

        const lines = [
            "Preparing Windows environment...",
            "",
            "Mounting: C:\\WINDOWS\\TEMP",
            "",
            "Loading registry...",
            "Reading: CLASSES.DAT",
            "",
            "Starting Windows 95...",
            "Please wait..."
        ];

        typeWindowsLines(lines, 0);
    }, 1000); // 1s black pause
}

function typeWindowsLines(lines, index) {
    if(index >= lines.length){
        // Finished all Windows lines → wait 2s, stop audio, redirect
        setTimeout(() => {
            // Stop boot-sequence
            bootAudio.pause();
            bootAudio.currentTime = 0;

            // Redirect to main.html
            window.location.href = "main.html";
        }, 2000); // 2 second delay
        return;
    }

    const line = lines[index];

    if(line.startsWith("Mounting: C:\\WINDOWS\\TEMP")){
        swapArray(line, ["C:\\WINDOWS\\SYSTEM","C:\\WINDOWS\\TEMP","C:\\WINDOWS\\CONFIG","C:\\WINDOWS\\FONTS","C:\\WINDOWS\\HELP"], 4, () => {
            typeWindowsLines(lines, index+1);
        });
    } else if(line.startsWith("Reading: CLASSES.DAT")){
        swapArray(line, ["CLASSES.DAT","USER.DAT","SYSTEM.DAT","WINDOWS.DAT"], 4, () => {
            typeWindowsLines(lines, index+1);
        });
    } else {
        windowsText.innerHTML += line + "\n";
        setTimeout(() => {
            typeWindowsLines(lines, index+1);
        }, 100 + Math.random()*50);
    }
}

// Reuse swapArray function for swapping lines
function swapArray(initialLine, array, maxSwaps, callback){
    let swapCount = 0;
    let lineDiv = document.createElement("div");
    // Decide which container
    let container = hardwareScreen.style.display === "block" ? hardwareText : windowsText;
    container.appendChild(lineDiv);

    const interval = setInterval(() => {
        const rand = array[Math.floor(Math.random()*array.length)];
        lineDiv.textContent = initialLine.split(":")[0] + ": " + rand;
        swapCount++;
        if(swapCount >= maxSwaps){
            clearInterval(interval);
            lineDiv.textContent = initialLine + "\n";
            callback();
        }
    }, 300);
}

// Trigger Windows phase after hardware completes
const originalTypeHardwareLines = typeHardwareLines;
typeHardwareLines = function(lines, index){
    if(index === lines.length){
        // 1s pause, black screen, then Windows
        setTimeout(startWindowsPhase, 1000);
    }
    originalTypeHardwareLines(lines, index);
};