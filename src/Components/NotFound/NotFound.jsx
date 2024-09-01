import image from './../../assets/images/error.svg'

const NotFound = () => {
  return (
    <>
        <div className='p-8'>
            <figure className='w-[60%] mx-auto'>
                <img src={image} alt="" className='w-full'/>
            </figure>
        </div>
    </>
)
}

export default NotFound