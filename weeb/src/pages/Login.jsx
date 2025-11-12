import Footer from "../components/Footer"
import Header from "../components/Header"
import Button from "../components/Button"
import { useState } from "react"
import useForm from "../hooks/useForm"

export default function Login() {
  const { values, focus, handleChange, handleInputFocus, handleInputBlur } = useForm({
    email: '',
    password: '',  
  });
  
  // Si on n'utilise pas useForm, on peut gérer l'état localement comme suit :
  // const [focus, setFocus] = useState({
  //   email: false,
  //   password: false,
  // });
  // const [values, setValues] = useState({
  //   email: '',
  //   password: '',
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues((prev) => ({ ...prev, [name]: value }));
  // }
  // const handleFocus = (field) => {
  //   setFocus((prev) => ({ ...prev, [field]: true }));
  // }
  // const handleBlur = (field) => {
  //   setFocus((prev) => ({ ...prev, [field]: false }));
  // }
  // const handleInputFocus = (field) => () => handleFocus(field);
  // const handleInputBlur = (field) => () => handleBlur(field);
  

  const inputClass = (field) => `
    bg-transparent border-b p-2 text-white text-center text-2xl placeholder-purple-400 focus:outline-none transition-all duration-200
    ${focus[field] ? "border-2 border-purple-400 rounded-md" : "border-purple-500"}
  `;


  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log("Forgot password clicked");
  }
  const handleCreateAccount = () => {
    // Handle create account logic here
    console.log("Create account clicked");
  }
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login button clicked");
  }
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin(e);
    }
  }
  

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0F172A] text-white">
      <Header />

      <main className="flex-grow flex items-center justify-center px-14 py-10 mb-10">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Se connecter</h1>

          <form className="flex flex-col gap-6">
            <input
              className={inputClass('email')}
              type="email"
              name="email"
              value={values.email}
              placeholder={focus.email ? "" : "Email"}
              onFocus={handleInputFocus('email')}
              onBlur={handleInputBlur('email')}
              onChange={handleChange} 
              onKeyDown={handleInputKeyDown}
            />
            <input 
              className={inputClass('password')}
              type="password"
              name="password"
              value={values.password}
              placeholder={focus.password ? "" : "Mot de passe"}
              onFocus={handleInputFocus('password')}
              onBlur={handleInputBlur('password')}
              onChange={handleChange}
              onKeyDown={handleInputKeyDown}
            />

            <Button type="submit" className="mt-4 mx-auto" onClick={handleLogin}>
              Se connecter
            </Button>

            <div className="text-sm text-gray-400 mt-4">
              <p className="mb-8 text-white">
                <a href="#" className="hover:underline" onClick={handleForgotPassword}>Mot de passe oublié ?</a>
              </p>
              <p className=""> 
                Vous n’avez pas de compte ? <br />
                <a href="#" className="underline hover:text-white transition" onClick={handleCreateAccount}>créer un compte</a>
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
