import { useState } from "react"
import styles from "./Sign.module.css"
import { useAuthStore } from "../store/auth"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { FaSignInAlt } from "react-icons/fa"

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()

      const data = await login(formData)

      if(!data.success) {
        console.log(data)
        toast.error(data.message)
        return
      }

      toast.success(data.message)

      navigate("/")

      setFormData({ email: "", password: "" })
    }

  return (
    <div className={styles.signContainer}>
      <div className={styles.signOverlay}>
          <div className={styles.signContent}>
              <header className={styles.loginHeader}>
                  <div className={styles.signIcon}><FaSignInAlt /></div> 
                  <h1> Login</h1>
              </header>
              <form onSubmit={handleRegister}>
                      <input
                          value={formData.email}
                          placeholder={"Email"}
                          name={"email"}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                          type={"email"}
                      />
                      <input
                          value={formData.password}
                          placeholder={"Password"}
                          name={"password"}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                          type={"password"}
                      />
                      <button title={"Submit"}>
                        Sign In
                      </button>
              </form>
              <footer>
                <p>Don't have an account?</p>
                <Link className={styles.signLink} to={"/register"}>Sign Up</Link>
              </footer>
          </div>
      </div>
    </div>
  )
}
