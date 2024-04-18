let finalOtp;
let intervalId;
let result;

const otpExpireId = document.getElementById("otp-expired-id");

function expireOtp() {
  const intervalTime = 1000;
  const timeOutTime = 15000;
  let slice = timeOutTime / intervalTime;

  intervalId = setInterval(function () {
    result
      ? (otpExpireId.innerText = "")
      : (otpExpireId.innerText = `OTP will expire in ${slice}`);
    slice = slice - 1;
  }, intervalTime);

  setTimeout(function () {
    if (result) {
      clearInterval(intervalId);
      otpExpireId.innerText = "";
    } else {
      clearInterval(intervalId);
      generateOtp();
      otpExpireId.innerText = `OTP has expired`;
    }
  }, timeOutTime);
}

function tackleOtpBoxes() {
  const boxes = document.getElementById("otp-box-list-id");
  boxes.addEventListener("input", function (e) {
    const target = e.target;
    const value = target.value;

    if (isNaN(value)) {
      target.value = "";
      return;
    }
    const nextElement = target.nextElementSibling;
    if (nextElement) {
      nextElement.focus();
    }
    // const previusElement = target.previousElementSibling;
    // if (previusElement) {
    //   previusElement.focus();
    // }
    validateOtp();
  });

  boxes.addEventListener("keydown", function (e) {
    const target = e.target;
    const value = target.value;

    if (e.key === "Backspace" && !value) {
      const previousElement = target.previousElementSibling;

      previousElement.focus();
    }
  });
}

function generateOtp() {
  finalOtp = Math.floor(1000 + Math.random() * 9000);
  const otpContainer = document.getElementById("generate-otp-id");
  otpContainer.innerText = `Your OTP is : ${finalOtp}`;
  expireOtp();
}

function validateOtp() {
  let typeNumber = "";
  const boxListElem = document.getElementById("otp-box-list-id");

  [...boxListElem.children].forEach((elem) => {
    typeNumber += elem.value;
  });

  result = finalOtp === parseInt(typeNumber, 10);
  if (result) {
    const results = document.getElementById("result-id");
    results.innerText = `OTP has validated successfully`;
    results.classList.remove("fail");
    results.classList.add("success");
  } else {
    const results = document.getElementById("result-id");
    results.innerText = `OTP is invalid`;
    results.classList.remove("success");
    results.classList.add("fail");
  }
}

function init() {
  console.log("JavaScript initializaion is done");
  tackleOtpBoxes();
  setTimeout(generateOtp, 2000);
}
init();
