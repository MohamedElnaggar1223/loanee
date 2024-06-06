import Image from 'next/image'
import { motion } from "framer-motion"

export default function SecondIphone() 
{
    const MotionImage = motion(Image)

    return (
        <>
            <div className='flex flex-1 items-center justify-center'>
                <MotionImage
                    src='/images/iphoneSecond.png'
                    alt='Phone'
                    width={300}
                    height={614}
                    initial={{ rotate: -4, opacity: 0 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.1, ease: 'easeInOut', delay: 0.5 }}
                    className='max-h-[614px] max-w-[300px]'
                    key='phone'
                />
            </div>
            <motion.div initial={{ opacity: 0, y: '-1000px' }} animate={{ opacity: 1, y: '0px' }} exit={{ opacity: 0, y: '1000px' }} transition={{ duration: 0.1 }} className='flex flex-1'>
                hey2
            </motion.div>
        </>
    )
}