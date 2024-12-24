import { useState } from "react"
import styles from "./Sign.module.css"
import { useAuthStore } from "../store/auth"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { FaUser } from "react-icons/fa"

export function Register() {
  const navigate = useNavigate()
  const { register } = useAuthStore()
  const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()

      const data = await register(formData)

      if(!data.success) {
        toast.error(data.message)
        return
      }

      toast.success(data.message)

      navigate("/")

      setFormData({ name: "", email: "", password: "", confirmPassword: "" })
    }

  return (
    <div className={styles.signContainer}>
      <div className={styles.signOverlay}>
          <div className={styles.signContent}>
              <header>
                  <h1><FaUser /> Sign Up</h1>
              </header>
              <form onSubmit={handleRegister}>
                  <input
                      value={formData.name}
                      placeholder={"Username"}
                      name={"name"}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value})}
                      type={"text"}
                  />
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
                      <input
                          value={formData.confirmPassword}
                          placeholder={"Confirm Password"}
                          name={"confirmPassword"}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value})}
                          type={"password"}
                      />
                      <button title={"Submit"}>
                        Submit
                      </button>
              </form>
              <footer>
                <p>Already have an account?</p>
                <Link className={styles.signLink} to={"/login"}>Log In</Link>
              </footer>
          </div>
      </div>
    </div>
  )
}
