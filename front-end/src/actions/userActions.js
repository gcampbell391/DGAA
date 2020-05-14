export const userLogin = user => {
    console.log("User Action", user)
    user.email = "hey"

    //Contiune working on Login Authenication using Thunk
    //  fetch('http://localhost:3000/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(userData),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)

    //         })
    return (dispatch) => {
        dispatch({
            type: "USER_LOGIN",
            user
        })

    }
}