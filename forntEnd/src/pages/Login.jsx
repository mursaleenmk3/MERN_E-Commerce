import { useState } from "react"

function Login() {
  const [state, setState] = useState("Login")
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    console.log("login function is executed", formData)
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const responseData = await response.json()
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token)
        window.location.replace('/')
      } else {
        console.error('Sign in failed', responseData)
      }
    } catch (error) {
      console.error('Error during sign in', error)
    }
  }

  const signIn = async () => {
    console.log("sign in function is executed", formData)
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const responseData = await response.json()
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token)
        window.location.replace('/')
      } else {
        console.error('Sign in failed', responseData)
      }
    } catch (error) {
      console.error('Error during sign in', error)
    }
  }

  return (
    <section className="max_padd_container flexCenter flex-col pt-32">
      <div className="max-w-[555px] h-[550px] bg-white m-auto px-14 py-10">
        <h3 className="h3">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
          {state === "Sign in" ? (
            <input
              type="text"
              value={formData.name}
              onChange={changeHandler}
              name="name"
              placeholder="Your Name"
              className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
            />
          ) : " "}
          <input
            type="email"
            value={formData.email}
            onChange={changeHandler}
            name="email"
            placeholder="Email Address"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={changeHandler}
            value={formData.password}
            name="password"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
        </div>
        <button
          onClick={state === "Sign in" ? signIn : login}
          className="btn_dark_rounded my-5 w-full !rounded-md"
        >
          Continue
        </button>
        {state === "Sign in" ? (
          <p className="text-black font-bold">
            Already have an account? <span className="text-secondary underline cursor-pointer" onClick={() => setState("Login")}>Login</span>
          </p>
        ) : (
          <p className="text-black font-bold">
            Create an account? <span className="text-secondary underline cursor-pointer" onClick={() => setState("Sign in")}>Click here</span>
          </p>
        )}

        <div className="flexCenter mt-6 gap-3">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </section>
  )
}

export default Login
