import loader from '../../app/assets/images/loader.png'
import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loader_layout}>
      <div className={styles.loader_wrapper}>
        <img alt='loader' src={loader}></img>
      </div>
    </div>
  )
}

export default Loader
