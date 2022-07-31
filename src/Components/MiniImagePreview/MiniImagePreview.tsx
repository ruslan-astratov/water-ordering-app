import styles from './MiniImagePreview.module.scss'

interface MiniImagePreviewProps {
  thumbnail: string | ''
}

const MiniImagePreview = ({ thumbnail }: MiniImagePreviewProps) => {
  return <img className={styles.mini_preview_img} src={thumbnail} alt='Мини превью' />
}
export default MiniImagePreview
