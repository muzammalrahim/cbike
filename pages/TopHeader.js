import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import en from "../components/locales/en"
import ar from "../components/locales/fr"
import TopHeaderLeft from "./TopHeaderLeft";

const TopHeader = () => {

  const router = useRouter()
  const [categories, setCategories] = useState([]);
  const { locale } = router
  const t = locale === 'en' ? en : ar
  const [userLogin, setUserLogin] = React.useState(t.navbar.register);

  useEffect(() => {
    loadCategories()
  }, [])

  const logout = async () => {

    await axios.post("https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/logout")
      .then((res) => {
        var data = res.data
        console.log("data", data);
        localStorage.clear();
        router.push("/Login")
      })
      .catch(() => { });
  }

  const changeLanguage = (e) => {
    let locale = e.target.value
    router.push('/', '/', { locale })
  }

  React.useEffect(() => {
    // Perform localStorage action
    const token = localStorage.getItem('loginToken')
    const loginName = localStorage.getItem("loginName");

    if (token) {
      setUserLogin(loginName);
    }
  }, [userLogin])

  const loadCategories = async () => {
    try {
      const res = await axios.get(`https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/getCategory`)
      console.log("res", res.data.data);
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return locale === "en" ? <nav className="navbar navbar-expand-lg navbar-light">
    <a className="navbar-brand" href="#">
      <img src="/images/website-logo.png" width="40" height="50" alt="nothing" />
    </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link href="/">
            <a className="nav-link" href="#">{t.navbar.home}</a>
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-black" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
            {t.navbar.discover}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            {
              categories.map((category, i) => {
                return (
                  <Link key={i} href={`/blog/${category._id}`}>
                    <a className="dropdown-item" href="#">{category.name}</a>
                  </Link>
                )
              })
            }
            {/* <Link href="/Blog">
              <a className="dropdown-item" href="#">{t.navbar.subDiscover}</a>
            </Link> */}
            {/* <Link href="/Event">
              <a className="dropdown-item" href="#">{t.navbar.events}</a>
            </Link>
            <Link href="/News">
              <a className="dropdown-item" href="#">{t.navbar.news}</a>
            </Link> */}
          </div>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-black" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
            {t.navbar.use}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#">{t.navbar.howRent}</a>
            <Link href="/Payment">
              <a className="dropdown-item" href="">{t.navbar.price}</a>
            </Link>
          </div>
        </li>
        <li className="nav-item active">
          <Link href={userLogin == t.navbar.register ? "/Register" : ""}>
            <a className="nav-link">{userLogin}</a>
          </Link>
        </li>
        {
          userLogin != t.navbar.register && <li className="nav-item active">
            <a className="nav-link logout-anchor" onClick={logout}>{t.navbar.logoutBtn}</a>
          </li>
        }
        <li className="nav-item active">
          <select
            style={{ border: "none", outline: "none", marginTop: "7px" }}
            value="Language"
            onChange={changeLanguage}
            defaultValue={locale}
          >
            <option value="en" style={{ border: "none", outline: "none" }}>{t.language.english}</option>
            <option value="ar">{t.language.arabic}</option>
          </select>
        </li>
      </ul>
    </div>
  </nav> : <TopHeaderLeft />

}

export default TopHeader;