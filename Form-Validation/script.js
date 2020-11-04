const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//function to show error messages
function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText=message;
}

//function to change border to green 
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className='form-control success'
}

//function to check if email is in specific format [test@test.com]
function checkValidEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value.trim())){
        showSuccess(email)
    }
    else{
        showError(email,'Email is not valid')
    }
}

//function to make first character of the id of input field [refer to input field in html]
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//function to check all required fields 
function checkRequired(inputArray){
    inputArray.forEach(function(input){
        if(input.value.trim()===''){
            showError(input,`${getFieldName(input)} is required`);
        }
        else{
            showSuccess(input);
        }
    });
}

// function to validate length of specific input fields
function checkInputLength(input, min, max){
    if(input.value.length < min){
        showError(input,`${getFieldName(input)} must contain atleast ${min} characters`);
    }
    else if(input.value.length > max){
        showError(input,`${getFieldName(input)} must contain less than ${max} characters`);
    }
    else{
        showSuccess(input);
    }
}

//function to check if password are same
function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2,'Password donot match');
    }
}

//Event listeners 
form.addEventListener('submit',function(e){
    e.preventDefault();
    checkRequired([username,email,password,password2]);
    checkInputLength(username, 3, 12);
    checkInputLength(password, 6, 8);
    checkValidEmail(email);
    checkPasswordsMatch(password,password2);

})