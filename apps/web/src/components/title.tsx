type TitleProps = {
  title: string
}

const Title = (props: TitleProps) => {
  const { title } = props

  return <div className='text-center text-4xl font-bold'>{title}</div>
}

export default Title
