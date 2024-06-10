'use client'
import Header from "@/components/Header";
import { AnimatePresence, useInView, motion, useMotionValueEvent, useScroll, useTransform, useWillChange } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lenis from 'lenis'
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { X } from "lucide-react"

export default function Page() 
{
    const [position, setPosition] = useState<'fixed' | 'absolute'>('absolute')
    const [imageShown, setImageShown] = useState('iphoneHero.png')

    const targetRef = useRef<HTMLDivElement>(null)
	const secondTargetRef = useRef<HTMLDivElement>(null)

    const { scrollY } = useScroll({
		target: targetRef,
		offset: ['start start', 'end start']
    })
	
	const { scrollYProgress } = useScroll({
		target: secondTargetRef,
		offset: ['start end', 'end end']
    })

    const top = useTransform(scrollYProgress, [0, 0.2], [-250, 25])
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.75])
    const rotate = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -4, -2, 0, 2, 4])
    const left = useTransform(scrollYProgress, [0, 0.2, 1], ['calc(50% - 200px)', 'calc(36.2% - 150px)', 'calc(36.2% - 150px)'])

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value >= 0 && value < 0.2) setImageShown('iphoneHero.png')
        else if(value >= 0.2 && value < 0.4) setImageShown('iphoneFirst.png')
        else if(value >= 0.4 && value < 0.6) setImageShown('iphoneSecond.png')
        else if(value >= 0.6 && value < 0.8) setImageShown('iphoneThird.png')
        else if(value >= 0.8 && value < 1) setImageShown('iphoneFourth.png')
        else if(value === 1) setImageShown('iphoneFifth.png')
    })
    
    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        console.log(value)
        if(value >= 0.2) {
            if(position !== 'fixed') {
                setPosition('fixed')
            }
        } 
        else if(position !== 'absolute') setPosition('absolute')
    })

    const MotionImage = motion(Image)

    return (
        <section className='flex flex-col min-h-[600vh] pt-6 no-scroll-bar px-5 md:px-12'>
            <section className='flex flex-col max-h-screen flex-1 z-30'>
                <Header />
                <section className='relative rounded-t-3xl flex flex-col pt-20 px-4 items-center gap-8 flex-1'>
                    <Image
                        src='/images/fourthDubaiBg.png'
                        fill
                        alt='Dubai'
                        className='rounded-t-3xl w-full h-full object-cover absolute z-[-2]' 
                    />
                    {/* <div className='z-[-1] bg-[rgba(110,37,37,0.70)] w-full h-full top-0 rounded-3xl absolute' /> */}
                    <div className='flex flex-col justify-center items-center gap-2.5'>
                        <h1 className='text-white font-bold max-md:hidden text-6xl'>Your personal finance</h1>
                        <h1 className='text-white font-bold max-md:hidden text-6xl'>assistant is on the way</h1>
                        <h1 className='text-white font-bold md:hidden text-center text-[32px] px-2 leading-[2.25rem]'>Your personal finance assistant is on the way</h1>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h4 className='text-xl max-md:hidden font-light text-white'>Get an overview of your finances, tips to improve your score, and</h4>
                        <h4 className='text-xl max-md:hidden font-light text-white'>personalised offers. All in one place.</h4>
                        <h4 className='text-sm text-center md:hidden font-light text-white'>Get an overview of your finances, tips to improve your score, and personalised offers. All in one place.</h4>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <div className='flex items-center justify-between gap-4 max-md:px-6 max-md:h-11'>
                            <input
                                type='text'
                                placeholder='Enter your email'
                                className='rounded-[0.5rem] max-md:min-h-full px-3.5 md:p-3.5 border outline-none border-white w-screen max-w-[180px] sm:max-w-[240px] md:max-w-[468px] bg-[#CBBEBD] text-black placeholder:text-black text-sm' 
                            />
                            <button className='px-4 max-md:min-h-full text-nowrap md:py-3.5 md:px-8 bg-[#ff0000] text-white font-medium rounded-[0.5rem] text-sm'>
                                Get Notified
                            </button>
                        </div>
                        <p className='text-xs md:text-base font-light text-white'>Get notified on launch of your personal finance assistant</p>
                    </div>
                </section>
            </section>
            <motion.section ref={secondTargetRef} className='relative flex-1 flex flex-col items-center justify-center w-full pl-[15%]'>
                <MotionImage
                    src={`/images/${imageShown}`}
                    alt='Phone'
                    width={400}
                    height={818}
                    // initial={{ left: 'calc(50% - 200px)' }}
                    // exit={{ rotate: -4, position: 'fixed', bottom: '-550px', y: 'calc(50vh - 228px)', left: 'calc(36.2% - 150px)', opacity: 0.95, width: '300px', height: '614px'}}
                    // transition={{ duration: 0.40, ease: 'easeInOut' }}
                    className={cn('-top-[250px] w-[400px] h-[818px] z-[99999]', position)}
                    //@ts-expect-error styles
                    style={{ top, scale, rotate, left }}
                />
                <div className='flex-1 flex items-center justify-center w-full'>
                    <div className='flex-1' />
                    <div className='flex flex-1 flex-col gap-4 overflow-hidden justify-end'>
                        <p className='uppercase font-bold text-[#ff0000] text-sm'>Financial Services</p>
                        <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Access financial services such as borrowing loans, take a credit card, and opening a bank account.</p>
                    </div>
                    
                </div>
                <div className='flex-1 flex items-center justify-center w-full'>
                    <div className='flex-1' />
                    <div className='flex flex-1 flex-col gap-4 overflow-hidden'>
                        <p className='uppercase font-bold text-[#ff0000] text-sm'>Personalized Offers</p>
                        <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Receive customized offers based on your credit score and enjoy pre-approved financial products for you.</p>
                    </div>

                </div>
                <div className='flex-1 flex items-center justify-center w-full'>
                    <div className='flex-1' />
                    <div className='flex flex-1 flex-col gap-4 overflow-hidden'>
                        <p className='uppercase font-bold text-[#ff0000] text-sm'>Secure Access</p>
                        <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Ensure secure login and registration through the trusted UAE PASS system, enhancing your safety.</p>
                    </div>

                </div>
                <div className='flex-1 flex items-center justify-center w-full'>
                    <div className='flex-1' />
                    <div className='flex flex-1 flex-col gap-4 overflow-hidden'>
                        <p className='uppercase font-bold text-[#ff0000] text-sm'>Financial Guide</p>
                        <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Gain valuable insights into credit reports and make right financial decisions that align with your goals.</p>
                    </div>

                </div>
                <div className='flex-1 flex items-center justify-center w-full'>
                    <div className='flex-1' />
                    <div className='flex flex-1 flex-col gap-4 overflow-hidden'>
                        <p className='uppercase font-bold text-[#ff0000] text-sm'>Product Comparison</p>
                        <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Easily compare various financial products to choose the ones that best suit your needs.</p>
                    </div>

                </div>
            </motion.section>
        </section>
    )
}