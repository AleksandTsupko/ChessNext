import GameSelection from "../gameSelection/GameSelection"
import styles from "./Home.module.css"

const Home = () => { 

    return (
          <div className={styles.gamesGrid}>
            <GameSelection type={"chess"}/>
            <GameSelection type={"checkers"}/>
            <GameSelection type={"bughouse chess"}/>
            <GameSelection type={"chess"}/>
            <GameSelection type={"chess"}/>
            <GameSelection type={"chess"}/>
          </div>
       
    )
  }
  
  export default Home