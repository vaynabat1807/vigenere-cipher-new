/* =========================================================
   VIGENERE CIPHER - COMPLETE APPLICATION LOGIC
   ========================================================= */


/* =========================================================
   SECTION 1
   VIGENERE ENCRYPTION
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
function vigenereEncrypt(text, key) {

    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {

        let char = text[i];

        // Only encrypt letters
        if (/[A-Za-z]/.test(char)) {

            // Convert plaintext letter to number
            // A = 0, B = 1, ..., Z = 25
            let textCode =
                char.toUpperCase().charCodeAt(0) - 65;

            // Get current key character
            // % makes the key repeat
            let keyCode =
                key[keyIndex % key.length]
                    .toUpperCase()
                    .charCodeAt(0) - 65;

            // Vigenere encryption formula
            let encryptedCode =
                (textCode + keyCode) % 26;

            // Convert number back to letter
            result += String.fromCharCode(
                encryptedCode + 65
            );

            // Move to next key character
            keyIndex++;

        } else {

            // Keep spaces and punctuation unchanged
            result += char;
        }
    }

    return result;
}



/* =========================================================
   SECTION 2
   VIGENERE DECRYPTION
   ========================================================= */

function vigenereDecrypt(text, key) {

    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {

        let char = text[i];

        // Only decrypt letters
        if (/[A-Za-z]/.test(char)) {

            // Convert ciphertext letter to number
            let textCode =
                char.toUpperCase().charCodeAt(0) - 65;

            // Get current key character
            // % repeats the key
            let keyCode =
                key[keyIndex % key.length]
                    .toUpperCase()
                    .charCodeAt(0) - 65;

            // Vigenere decryption formula
            let decryptedCode =
                (textCode - keyCode + 26) % 26;

            // Convert number back to letter
            result += String.fromCharCode(
                decryptedCode + 65
            );

            // Move to next key character
            keyIndex++;

        } else {

            // Keep spaces and punctuation unchanged
            result += char;
        }
    }

    return result;
}



/* =========================================================
   SECTION 3
   HELPER FUNCTIONS
   ========================================================= */

function showScreen(screenId) {

    document.querySelectorAll(".screen")
        .forEach(function(screen) {

            screen.classList.remove("active-screen");

        });

    document.getElementById(screenId)
        .classList.add("active-screen");
}


function showView(viewId) {

    document.querySelectorAll(".app-view")
        .forEach(function(view) {

            view.classList.remove("active-view");

        });

    document.getElementById(viewId)
        .classList.add("active-view");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   PROFESSIONAL NOTIFICATIONS
   ========================================================= */

function showToast(message, type = "success") {

    const container =
        document.getElementById(
            "toastContainer"
        );

    if (!container) {
        return;
    }

    const toast =
        document.createElement("div");

    toast.className =
        `toast toast-${type}`;

    const icon =
        document.createElement("div");

    icon.className =
        "toast-icon";

    icon.textContent =
        type === "success"
            ? "✓"
            : "⚠";

    const text =
        document.createElement("div");

    text.className =
        "toast-message";

    text.textContent =
        message;

    toast.appendChild(icon);
    toast.appendChild(text);

    container.appendChild(toast);


    setTimeout(function() {

        toast.classList.add("hide");

        setTimeout(function() {

            toast.remove();

        }, 250);

    }, 2500);
}

/* =========================================================
   REPEATING KEY VISUALIZER
   ========================================================= */

function updateKeyPattern() {

    let plaintext =
        document.getElementById("plaintext")
            .value;

    let key =
        document.getElementById("encryptKey")
            .value
            .replace(/[^A-Za-z]/g, "");

    let pattern =
        document.getElementById("keyPattern");

    let lengthDisplay =
        document.getElementById("keyPatternLength");


    if (key === "") {

        pattern.textContent =
            "Enter a key to preview the repeated pattern.";

        lengthDisplay.textContent =
            "0 letters";

        return;
    }


    let letterCount =
        plaintext.replace(
            /[^A-Za-z]/g,
            ""
        ).length;


    if (letterCount === 0) {

        pattern.textContent =
            "Enter plaintext to preview the repeated key.";

        lengthDisplay.textContent =
            "0 letters";

        return;
    }


    let repeatedKey = "";


    for (
        let i = 0;
        i < letterCount;
        i++
    ) {

        repeatedKey +=
            key[
                i % key.length
            ].toUpperCase();
    }


    pattern.textContent =
        repeatedKey;

    lengthDisplay.textContent =
        `${letterCount} letters`;
}
document.getElementById("plaintext")
    .addEventListener(
        "input",
        updateKeyPattern
    );

document.getElementById("encryptKey")
    .addEventListener(
        "input",
        updateKeyPattern
    );



/* =========================================================
   SECTION 4
   WELCOME SCREEN
   ========================================================= */

document.getElementById("continueButton")
    .addEventListener("click", function() {

        let name =
            document.getElementById("userName")
                .value
                .trim();

        let nim =
            document.getElementById("userNim")
                .value
                .trim();

        let robotChecked =
            document.getElementById("robotCheck")
                .checked;

        let error =
            document.getElementById("welcomeError");


        // Clear old error
        error.textContent = "";


        // Name validation
        if (name === "") {

            error.textContent =
                "Please enter your full name.";

            return;
        }


        // NIM validation
        if (nim === "") {

            error.textContent =
                "Please enter your NIM.";

            return;
        }


        // Robot validation
        if (!robotChecked) {

            error.textContent =
                "Please confirm that you are not a robot.";

            return;
        }


        // Display user name
        document.getElementById("displayUserName")
            .textContent = name;

        document.getElementById("dashboardName")
            .textContent = name;


        // Hide welcome and show application
        showScreen("appScreen");

        showView("dashboardView");
    });



/* =========================================================
   SECTION 5
   DASHBOARD NAVIGATION
   ========================================================= */

document.getElementById("openEncrypt")
    .addEventListener("click", function() {

        showView("encryptView");

    });


document.getElementById("openDecrypt")
    .addEventListener("click", function() {

        showView("decryptView");

    });



/* =========================================================
   SECTION 6
   BACK TO DASHBOARD
   ========================================================= */

document.getElementById("backDashboardFromEncrypt")
    .addEventListener("click", function() {

        showView("dashboardView");

    });


document.getElementById("backDashboardFromDecrypt")
    .addEventListener("click", function() {

        showView("dashboardView");

    });

    document.getElementById("backDashboardFromSecurity")
    .addEventListener("click", function() {

        showView("dashboardView");

    });


document.getElementById("backDashboardFromTests")
    .addEventListener("click", function() {

        showView("dashboardView");

    });

/* =========================================================
   SECTION 6.5
   HEADER NAVIGATION
   ========================================================= */

function setActiveNav(buttonId) {

    document.querySelectorAll(".nav-button")
        .forEach(function(button) {

            button.classList.remove("active");

        });

    document.getElementById(buttonId)
        .classList.add("active");
}


document.getElementById("navDashboard")
    .addEventListener("click", function() {

        showView("dashboardView");

        setActiveNav("navDashboard");

    });


document.getElementById("navSecurity")
    .addEventListener("click", function() {

        showView("securityView");

        setActiveNav("navSecurity");

    });


document.getElementById("navTests")
    .addEventListener("click", function() {

        showView("testsView");

        setActiveNav("navTests");

    });

    document.getElementById("dashboardOpenTests")
    .addEventListener("click", function() {

        showView("testsView");

        setActiveNav("navTests");

    });

/* =========================================================
   SECTION 7
   ENCRYPTION BUTTON
   ========================================================= */

document.getElementById("encryptButton")
    .addEventListener("click", function() {

        let plaintext =
            document.getElementById("plaintext")
                .value
                .trim();

        let key =
            document.getElementById("encryptKey")
                .value
                .trim();


        // Check plaintext
        if (plaintext === "") {

            alert("Please enter plaintext.");

            return;
        }


        // Check key
        if (key === "") {

            alert("Please enter a key.");

            return;
        }


        // Key must contain letters only
        if (!/^[A-Za-z]+$/.test(key)) {

            alert("Key must contain letters only.");

            return;
        }


        // Encrypt message
        let ciphertext =
            vigenereEncrypt(
                plaintext,
                key
            );


        // Show ciphertext
        document.getElementById("ciphertext")
            .textContent = ciphertext;


        showToast(
    "Encryption completed successfully.",
    "success"
);


        // Show decrypt prompt
        document.getElementById("decryptPrompt")
            .classList.add("show");

    });



/* =========================================================
   SECTION 8
   "YES, DECRYPT" BUTTON
   ========================================================= */

document.getElementById("decryptYes")
    .addEventListener("click", function() {

        let ciphertext =
            document.getElementById("ciphertext")
                .textContent;

        let key =
            document.getElementById("encryptKey")
                .value
                .trim();


        // Put generated ciphertext into decrypt input
        document.getElementById("decryptText")
            .value = ciphertext;


        // Put same key into decrypt input
        document.getElementById("decryptKey")
            .value = key;


        // Open decryption page
        showView("decryptView");

    });



/* =========================================================
   SECTION 9
   "NO, FINISH" BUTTON
   ========================================================= */

document.getElementById("decryptNo")
    .addEventListener("click", function() {

        showView("dashboardView");

    });



/* =========================================================
   SECTION 10
   DECRYPTION BUTTON
   ========================================================= */

document.getElementById("decryptButton")
    .addEventListener("click", function() {

        let ciphertext =
            document.getElementById("decryptText")
                .value
                .trim();

        let key =
            document.getElementById("decryptKey")
                .value
                .trim();


        // Check ciphertext
        if (ciphertext === "") {

            alert("Please enter ciphertext.");

            return;
        }


        // Check key
        if (key === "") {

            alert("Please enter a key.");

            return;
        }


        // Key validation
        if (!/^[A-Za-z]+$/.test(key)) {

            alert("Key must contain letters only.");

            return;
        }


        // Decrypt message
        let plaintext =
            vigenereDecrypt(
                ciphertext,
                key
            );


        // Show plaintext
        document.getElementById("decryptedText")
            .textContent = plaintext;

    showToast(
    "Decryption completed successfully.",
    "success"
);
    });



/* =========================================================
   SECTION 11
   COPY CIPHERTEXT
   ========================================================= */

document.getElementById("copyCiphertext")
    .addEventListener("click", function() {

        let text =
            document.getElementById("ciphertext")
                .textContent;

        if (
            text === "" ||
            text === "Your ciphertext will appear here."
        ) {

            return;
        }


        navigator.clipboard.writeText(text)
            .then(function() {

                this.textContent = "Copied!";

                let button = this;

                setTimeout(function() {

                    button.textContent = "Copy";

                }, 1500);

            }.bind(this))
            .catch(function() {

                alert("Unable to copy ciphertext.");

            });

    });



/* =========================================================
   SECTION 12
   COPY PLAINTEXT
   ========================================================= */

document.getElementById("copyPlaintext")
    .addEventListener("click", function() {

        let text =
            document.getElementById("decryptedText")
                .textContent;

        if (
            text === "" ||
            text === "Your plaintext will appear here."
        ) {

            return;
        }


        navigator.clipboard.writeText(text)
            .then(function() {

                this.textContent = "Copied!";

                let button = this;

                setTimeout(function() {

                    button.textContent = "Copy";

                }, 1500);

            }.bind(this))
            .catch(function() {

                alert("Unable to copy plaintext.");

            });

    });



/* =========================================================
   SECTION 13
   KEY REUSE SECURITY DEMONSTRATION
   ========================================================= */

document.getElementById("reuseButton")
    .addEventListener("click", function() {

        let message1 =
            document.getElementById("message1")
                .value
                .trim();

        let message2 =
            document.getElementById("message2")
                .value
                .trim();

        let key =
            document.getElementById("reuseKey")
                .value
                .trim();


        // Validation
        if (
            message1 === "" ||
            message2 === "" ||
            key === ""
        ) {

            alert(
                "Please enter both messages and a shared key."
            );

            return;
        }


        // Key validation
        if (!/^[A-Za-z]+$/.test(key)) {

            alert(
                "Key must contain letters only."
            );

            return;
        }


        // Encrypt both messages
        let cipher1 =
            vigenereEncrypt(
                message1,
                key
            );

        let cipher2 =
            vigenereEncrypt(
                message2,
                key
            );


        // Build repeated key for message 1
        let repeatedKey1 = "";

        let letters1 =
            message1.replace(
                /[^A-Za-z]/g,
                ""
            );


        for (
            let i = 0;
            i < letters1.length;
            i++
        ) {

            repeatedKey1 +=
                key[
                    i % key.length
                ]
                .toUpperCase();
        }


        // Build repeated key for message 2
        let repeatedKey2 = "";

        let letters2 =
            message2.replace(
                /[^A-Za-z]/g,
                ""
            );


        for (
            let i = 0;
            i < letters2.length;
            i++
        ) {

            repeatedKey2 +=
                key[
                    i % key.length
                ]
                .toUpperCase();
        }


        // Display Message 1
        document.getElementById(
            "reuseMessageDisplay1"
        ).textContent = message1;


        document.getElementById(
            "reuseKeyDisplay1"
        ).textContent = repeatedKey1;


        document.getElementById(
            "reuseCipher1"
        ).textContent = cipher1;


        // Display Message 2
        document.getElementById(
            "reuseMessageDisplay2"
        ).textContent = message2;


        document.getElementById(
            "reuseKeyDisplay2"
        ).textContent = repeatedKey2;


        document.getElementById(
            "reuseCipher2"
        ).textContent = cipher2;


        // Security message
        document.getElementById(
            "securityMessage"
        ).textContent =
            "Security note: Reusing the same key for multiple messages can reveal patterns and make cryptanalysis easier.";

    });



/* =========================================================
   SECTION 14
   ENCRYPTION TEST CASES
   ========================================================= */

function runTestCases() {

    const tests = [

        {
            plaintext:
                "ATTACKATDAWN",

            key:
                "LEMON",

            expected:
                "LXFOPVEFRNHR",

            output:
                "testOutput1",

            result:
                "testResult1"
        },

        {
            plaintext:
                "HELLO",

            key:
                "KEY",

            expected:
                "RIJVS",

            output:
                "testOutput2",

            result:
                "testResult2"
        },

        {
            plaintext:
                "COMPUTER",

            key:
                "ABC",

            expected:
                "CPOPVVES",

            output:
                "testOutput3",

            result:
                "testResult3"
        }

    ];


    tests.forEach(function(test) {

        let actual =
            vigenereEncrypt(
                test.plaintext,
                test.key
            );


        document.getElementById(
            test.output
        ).textContent = actual;


        if (actual === test.expected) {

    document.getElementById(
        test.result
    ).textContent = "PASS";


    if (test.output === "testOutput1") {
        document.getElementById(
            "dashboardEncryptTest1"
        ).textContent = "Test 01 · PASS";
    }

    if (test.output === "testOutput2") {
        document.getElementById(
            "dashboardEncryptTest2"
        ).textContent = "Test 02 · PASS";
    }

    if (test.output === "testOutput3") {
        document.getElementById(
            "dashboardEncryptTest3"
        ).textContent = "Test 03 · PASS";
    }


} else {

    document.getElementById(
        test.result
    ).textContent = "FAIL";

}
    });
}



/* =========================================================
   SECTION 15
   DECRYPTION TEST CASES
   ========================================================= */

function runDecryptionTests() {

    const tests = [

        {
            ciphertext:
                "LXFOPVEFRNHR",

            key:
                "LEMON",

            expected:
                "ATTACKATDAWN",

            output:
                "decryptOutput1",

            result:
                "decryptResult1"
        },

        {
            ciphertext:
                "RIJVS",

            key:
                "KEY",

            expected:
                "HELLO",

            output:
                "decryptOutput2",

            result:
                "decryptResult2"
        },

        {
            ciphertext:
                "CPOPVVES",

            key:
                "ABC",

            expected:
                "COMPUTER",

            output:
                "decryptOutput3",

            result:
                "decryptResult3"
        }

    ];


    tests.forEach(function(test) {

        let actual =
            vigenereDecrypt(
                test.ciphertext,
                test.key
            );


        document.getElementById(
            test.output
        ).textContent = actual;


        if (actual === test.expected) {

            document.getElementById(
                test.result
            ).textContent = "PASS";

        } else {

            document.getElementById(
                test.result
            ).textContent = "FAIL";
        }

    });
}



/* =========================================================
   SECTION 16
   INFO CARD NAVIGATION
   ========================================================= */

document.querySelectorAll(".info-card")
    .forEach(function(card) {

        let title =
            card.querySelector("h3");

        if (!title) {
            return;
        }


        let titleText =
            title.textContent
                .trim()
                .toLowerCase();


        card.style.cursor = "pointer";


        card.addEventListener(
            "click",
            function() {

                // Repeating Key → Encryption
                if (
                    titleText.includes(
                        "repeating key"
                    )
                ) {

                    showView("encryptView");

                }


                // Security Demo
                else if (
    titleText.includes(
        "key reuse"
    )
) {

    showView("securityView");

    setActiveNav("navSecurity");

}


                // Test Suite
                else if (
    titleText.includes(
        "test suite"
    )
) {

    showView("testsView");

    setActiveNav("navTests");

}

            }
        );

    });



/* =========================================================
   SECTION 17
   RUN AUTOMATED TESTS
   ========================================================= */

runTestCases();

runDecryptionTests();
});