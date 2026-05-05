function Navbar() {

  return (

    <div style={styles.navbar}>

      <img
        src="images/logo.png"
        alt="Logo"
        style={styles.logo}
      />

    </div>

  );

}

const styles = {

  navbar: {
    background: "#222",
    padding: "10px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  logo: {
    height: "120px",     // 🔥 tamaño real del logo
    width: "auto",
    display: "block"
    
  }

};

export default Navbar;