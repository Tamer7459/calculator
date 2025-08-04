// إعدادات عامة
let display = document.getElementById("display");
let current = "";
let isRadians = true;
let memory = 0;

// عرض القيم
function append(val) {
    current += val;
    display.value = current;
}

// مسح الشاشة
function clearDisplay() {
    current = "";
    display.value = "0";
}

// تغيير الإشارة +/-
function toggleSign() {
    if (current) {
        if (current.startsWith('-')) {
            current = current.slice(1);
        } else {
            current = '-' + current;
        }
        display.value = current;
    }
}

// التبديل بين Rad و Deg
function toggleRadDeg(button) {
    isRadians = !isRadians;
    button.textContent = isRadians ? "Rad" : "Deg";
}

// العاملي (n!)
function factorial(n) {
    n = parseInt(n);
    if (isNaN(n) || n < 0) return "Error";
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}



function calculate() {
    try {
        // تصحيح الأقواس
        let openParens = (current.match(/\(/g) || []).length;
        let closeParens = (current.match(/\)/g) || []).length;
        if (openParens > closeParens) {
            current += ")".repeat(openParens - closeParens);
        }

        let expr = current;


// دعم الدوال square() و cube()
expr = expr.replace(/square\(([^)]+)\)/g, (_, x) => `Math.pow(${x}, 2)`);
expr = expr.replace(/cube\(([^)]+)\)/g, (_, x) => `Math.pow(${x}, 3)`);


        // الثوابت
        expr = expr.replace(/π/g, Math.PI);
        expr = expr.replace(/(?<![a-zA-Z])e(?![a-zA-Z])/g, 'Math.E');

        // دوال خاصة
        expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');
        expr = expr.replace(/cbrt\(/g, 'Math.cbrt(');
        expr = expr.replace(/log\(/g, 'Math.log10(');
        expr = expr.replace(/ln\(/g, 'Math.log(');
        expr = expr.replace(/exp\(/g, 'Math.exp(');

        // أسس
        expr = expr.replace(/([0-9]+)²/g, (_, n) => `Math.pow(${n},2)`);
        expr = expr.replace(/([0-9]+)³/g, (_, n) => `Math.pow(${n},3)`);
        expr = expr.replace(/([0-9]+)\^([0-9]+)/g, (_, base, exp) => `Math.pow(${base},${exp})`);

        // مضروب
        expr = expr.replace(/([0-9]+)!/g, (_, n) => factorial(n));

// دوال عكسية - نبدأ بها لتفادي تكرار الاستبدال
expr = expr.replace(/\barcsin\(([^)]+)\)/g, (_, x) =>
    isRadians ? `Math.asin(${x})` : `(Math.asin(${x}) * 180 / Math.PI)`
);
expr = expr.replace(/\barccos\(([^)]+)\)/g, (_, x) =>
    isRadians ? `Math.acos(${x})` : `(Math.acos(${x}) * 180 / Math.PI)`
);
expr = expr.replace(/\barctan\(([^)]+)\)/g, (_, x) =>
    isRadians ? `Math.atan(${x})` : `(Math.atan(${x}) * 180 / Math.PI)`
);

// ثم نضيف الدوال المثلثية العادية
expr = expr.replace(/\bsin\(([^)]+)\)/g, (_, x) =>
    isRadians ? `Math.sin(${x})` : `Math.sin(${x} * Math.PI / 180)`
);
expr = expr.replace(/\bcos\(([^)]+)\)/g, (_, x) =>
    isRadians ? `Math.cos(${x})` : `Math.cos(${x} * Math.PI / 180)`
);
expr = expr.replace(/\btan\(([^)]+)\)/g, (_, x) =>
    isRadians ? `Math.tan(${x})` : `Math.tan(${x} * Math.PI / 180)`
);


        console.log("Expression to evaluate:", expr);

        let result = eval(expr);
        current = result.toString();
        display.value = current;
    } catch (e) {
        console.error("Calculation error:", e);
        display.value = "Error";
        current = "";
    }
}

function memoryPlus() {
    memory += parseFloat(current || 0);
}
function memoryMinus() {
    memory -= parseFloat(current || 0);
}
function memoryRecall() {
    current = memory.toString();
    display.value = current;
}
function memoryClear() {
    memory = 0;
}

function insertFunction(name) {
    current += name + "(";
    display.value = current;
}

function backspace() {
    if (current.length > 0) {
        current = current.slice(0, -1); // حذف آخر حرف
        display.value = current || "0"; // إظهار "0" إن أصبحت فارغة
    }
}

let extraVisible = true;

function toggleExtra() {
    const extras = document.querySelectorAll(".extra-buttons");
    const logoBtn = document.getElementById("logoBtn");

    extraVisible = !extraVisible;

    extras.forEach(btn => {
        if (extraVisible) {
            btn.classList.remove("show");
        } else {
            btn.classList.add("show");
        }
    });

    // تدوير زر Logo
    logoBtn.classList.toggle("rotated");
}





