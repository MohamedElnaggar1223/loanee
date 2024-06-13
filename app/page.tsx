'use client'
import Header from "@/components/Header";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import Lenis from 'lenis'
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Head from "next/head";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { countryDialingCodes } from "@/constants";

const signUpSchema = z.object({
    fistName: z.string().min(2, {
        message: 'Invalid first name'
    }),
    jobTitle: z.string().min(2, {
        message: 'Invalid job title'
    }),
    email: z.string().email({
        message: 'Invalid email'
    }),
    mobile: z.string().min(10, {
        message: 'Invalid mobile number'
    }).refine(value => {
        return /^\d+$/.test(value)
    })
})

const demoImagesRotation = [
	'demoIphoneTwelvth.png',
	'demoIphoneThirteenth.png',
	'demoIphoneFirst.png',
	'demoIphoneSecond.png',
	'demoIphoneThird.png',
	'demoIphoneFourth.png',
	'demoIphoneFifth.png',
	'demoIphoneSixth.png',
	'demoIphoneSeventh.png',
	'demoIphoneEighth.png',
	'demoIphoneNinth.png',
	'demoIphoneTenth.png',
	'demoIphoneEleventh.png',
]

const demoImagesClickPos = [
	'top-[85.5%] h-[35px] w-[35px] md:h-[80px] md:w-[80px] left-[42%] md:left-[40%] rounded-full',
	'top-[85.5%] h-[35px] w-[35px] md:h-[80px] md:w-[80px] left-[42%] md:left-[40%] rounded-full',
	'top-[23.45%] h-[35px] md:h-[75px]',
	'top-[23.45%] h-[35px] md:h-[75px]',
	'top-[85%] h-[30px] md:h-[45px]',
	'top-[85%] h-[30px] md:h-[45px]',
	'top-[87.5%] h-[30px] md:h-[45px]',
	'top-[87.5%] h-[30px] md:h-[45px]',
	'top-[800%] h-[30px] md:h-[45px]',
	'top-[75%] h-[25%]',
	'top-[87.5%] h-[30px] md:h-[45px] left-[53.5%] w-[36.25%]',
	'top-[87.5%] h-[30px] md:h-[45px] left-[53.5%] w-[36.25%]',
	'top-[40rem]',
]

const featureImages = [
    'iphoneHero.png',
    'iphoneFirst.png',
    'iphoneSecond.png',
    'iphoneThird.png',
    'iphoneFourth.png',
    'iphoneFifth.png',
]

export default function Page() 
{
    const [position, setPosition] = useState<'fixed' | 'absolute'>('absolute')
    const [imageShown, setImageShown] = useState('iphoneHero.png')
    const [footerShown, setFooterShown] = useState(false)
    const [signUpFormShown, setSignUpFormShown] = useState(false)
    const [signUpFormSubmitted, setSignUpFormSubmitted] = useState(false)
    const [imageDemo, setImageDemo] = useState({
		image: 'demoIphoneTwelvth.png',
		clickPos: 'top-[85.5%] h-[35px] w-[35px] md:h-[80px] md:w-[80px] left-[42%] md:left-[40%] rounded-full',
		clicked: false,
		finished: false,
        began: false
	})
    const [innerWidth, setInnerWidth] = useState(0)
    const [innerHeight, setInnerHeight] = useState(0)

	useEffect(() => {
		setInnerWidth(window.innerWidth)
        setInnerHeight(window.innerHeight)
	}, [])

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            fistName: '',
            jobTitle: '',
            email: '',
            mobile: ''
        },
    })

	const secondTargetRef = useRef<HTMLDivElement>(null)

	const { scrollYProgress } = useScroll({
		target: secondTargetRef,
		offset: ['start end', 'end end']
    })

    // const top = useTransform(scrollYProgress, [0, (1/6), innerWidth > 768 ? 0.98 : 0.9, innerWidth > 768 ? 1 : 0.981], ['-24vh', innerHeight > 768 ?  innerWidth > 768 ? '5vh' : '12vh' : '-10vh', innerHeight > 768 ?  innerWidth > 768 ? '5vh' : '12vh' : '-10vh', innerHeight > 768 ?  innerWidth > 768 ? '5vh' : '25vh' : '-5vh'])
    // const scale = useTransform(scrollYProgress, [0, (1/6), innerWidth > 768 ? 0.98 : 0.9, innerWidth > 768 ? 1 : 0.981], [1, innerHeight > 768 ? innerWidth > 768 ? 0.75 : 0.95 : 0.65, innerHeight > 768 ? innerWidth > 768 ? 0.75 : 0.95 : 0.65, innerHeight > 768 ? innerWidth > 768 ? 0.75 : 1.25 : 0.65])
    const top = useTransform(scrollYProgress, [0, (1/6), innerWidth > 768 ? 0.98 : 0.9, innerWidth > 768 ? 1 : 0.981], [(innerHeight > 768 && innerWidth > 768) ? '-36vh' : (innerHeight < 768 && innerWidth > 768) ? '-42vh' : '-40vh', (innerHeight > 768 && innerWidth > 768) ? '5vh' : (innerHeight < 768 && innerWidth > 768) ? '-16.5vh' : '12vh', (innerHeight > 768 && innerWidth > 768) ? '5vh' : (innerHeight < 768 && innerWidth > 768) ? '-16.5vh' : '12vh', (innerHeight > 768 && innerWidth > 768) ? '5vh' : (innerHeight < 768 && innerWidth > 768) ? '-12vh' : '25vh'])
    const scale = useTransform(scrollYProgress, [0, (1/6), innerWidth > 768 ? 0.98 : 0.9, innerWidth > 768 ? 1 : 0.981], [(innerHeight > 768 && innerWidth > 768) ? 1 : (innerHeight < 768 && innerWidth > 768) ? 0.75 : 1, (innerHeight > 768 && innerWidth > 768) ? 0.75 : (innerHeight < 768 && innerWidth > 768) ? 0.6 : 1, (innerHeight > 768 && innerWidth > 768) ? 0.75 : (innerHeight < 768 && innerWidth > 768) ? 0.55 : 1, (innerHeight > 768 && innerWidth > 768) ? 0.75 : (innerHeight < 768 && innerWidth > 768) ? 0.55 : 1.25])
    const rotate = useTransform(scrollYProgress, [0, (1/6), (2/6), (3/6), (4/6), (5/6), 1], [0, -4, -2, 0, 2, 4, 0])
    const left = useTransform(scrollYProgress, [0, (1/6), (5/6), 1], [innerWidth > 768 ? 'calc(50% - 200px)' : 'calc(50% - 100px)', innerWidth > 768 ? 'calc(36.2% - 150px)' : 'calc(50% - 100px)', innerWidth > 768 ? 'calc(36.2% - 150px)' : 'calc(50% - 100px)', innerWidth > 768 ? 'calc(50% - 200px)' : 'calc(50% - 100px)'])
    const tryText = useTransform(scrollYProgress, [(5/6), 1], [-100, 0])
    const opacityBg = useTransform(scrollYProgress, [0, (1/6)-0.0001, (1/6), 0.9999, 1], [0, 0, 1, 1, 0])

    const firstFeatureOpacity = useTransform(scrollYProgress, [0.19, 0.1945], [1, innerWidth > 768 ? 1 : 0])
    const secondFeatureOpacity = useTransform(scrollYProgress, [0.34, 0.345], [1, innerWidth > 768 ? 1 : 0])
    const thirdFeatureOpacity = useTransform(scrollYProgress, [0.50, 0.505], [1, innerWidth > 768 ? 1 : 0])
    const fourthFeatureOpacity = useTransform(scrollYProgress, [0.68, 0.6815], [1, innerWidth > 768 ? 1 : 0])
    const fifthFeatureOpacity = useTransform(scrollYProgress, [0.845, 0.85], [1, innerWidth > 768 ? 1 : 0])

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        console.log(value)
        if(value === 1) setImageShown('demoIphoneTwelvth.png')
        else if(value >= 0 && value < ((1/6) / 2)) setImageShown('iphoneHero.png')
        else if(value >= ((1/6) / 2) && value < ((2/6)) - 0.05) setImageShown('iphoneFirst.png')
        else if(value >= ((2/6) - 0.05) && value < ((3/6)) - 0.05) setImageShown('iphoneSecond.png')
        else if(value >= ((3/6) - 0.05) && value < ((4/6)) - 0.05) setImageShown('iphoneThird.png')
        else if(value >= ((4/6) - 0.05) && value < ((5/6)) - 0.05) setImageShown('iphoneFourth.png')
        else if(value >= ((5/6) - 0.05) && value < (1 - 0.05)) setImageShown('iphoneFifth.png')
        else if(value >= (1 - 0.05)) setImageShown('demoIphoneThirteenth.png')
    })
    
    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value >= (1/6) && !footerShown) {
            if(position !== 'fixed') {
                setPosition('fixed')
            }
        } 
        else if(position !== 'absolute') setPosition('absolute')
    })

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if((value === 1 || (innerWidth < 768 && value >= 0.98)) && !imageDemo.began) {
            setImageDemo(prev => ({...prev, began: true}))
            if(!signUpFormSubmitted) setSignUpFormShown(true)
        }
        else if((value === 1 || (innerWidth < 768 && value >= 0.98))) {
            if(!signUpFormSubmitted) setSignUpFormShown(true)
        }
        else if(value <= 1) {
            setImageDemo({
                began: false,
                image: 'demoIphoneTwelvth.png',
                clicked: false,
                clickPos: 'top-[85.5%] h-[35px] w-[35px] md:h-[80px] md:w-[80px] left-[42%] md:left-[40%] rounded-full',
                finished: false
            })
        }
    })

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(imageDemo.finished) {
            if(scrollYProgress.getPrevious()! < value) {
                setFooterShown(true)
            }
            else if(footerShown) {
                setFooterShown(false)
            }
        }
    })

    useEffect(() => {
		if(imageDemo.clicked) {
			const index = demoImagesRotation.indexOf(imageDemo.image)
			let finished = false
			if(demoImagesRotation[index + 1] === 'demoIphoneEleventh.png') {
				finished = true
			}
			setImageDemo((prev) => ({...prev, image: demoImagesRotation[index + 1], clicked: false, clickPos: demoImagesClickPos[index + 1], finished}))
            setImageShown(demoImagesRotation[index + 1])
        }
		else if(imageDemo.image === 'demoIphoneSeventh.png') {
			setTimeout(() => {
				setImageDemo((prev) => ({...prev, clicked: true}))
			}, 2000)
		}
        else if(imageDemo.finished) {
            setFooterShown(true)
        }
	}, [imageDemo])

    useEffect(() => {
        if(footerShown) setPosition('absolute')
    }, [footerShown])

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function onSubmit(values: z.infer<typeof signUpSchema>) {
        setSignUpFormShown(false)
        setSignUpFormSubmitted(true)
    }

    return (
        <>
            <Head>
                {demoImagesRotation.map((image) => (
                    <link key={image} rel="preload" href={`/images/${image}`} as="image" />
                ))}
                {featureImages.map((image) => (
                    <link key={image} rel="preload" href={`/images/${image}`} as="image" />
                ))}
            </Head>
            <section className='flex flex-col min-h-[700vh] pt-6 no-scroll-bar px-5 md:px-12'>
                
                <iframe className='absolute hidden max-w-[25%] h-[22%] max-md:h-[18%] z-[12] top-[36.2%] left-[38%]' src="https://lottie.host/embed/750089d4-57f1-4eee-905f-320f4d1bd426/dJ9Ay5cVnY.json"/>                    
                <iframe className='absolute hidden max-w-[65.25%] h-[25%] max-md:h-[25.75%] z-[12] bottom-[18%] left-[17.85%] bg-gradient-to-b from-[#F5F3F3] to-[#FAFAFA]' src="https://lottie.host/embed/3b0bcb06-2fa8-4678-8fda-ba680b1fa639/pUiwIQlYOj.json"></iframe>                

                <section className='flex flex-col max-h-screen flex-1 z-30 min-h-screen'>
                    <Header />
                    <section className='relative rounded-t-3xl flex flex-col pt-20 px-4 items-center max-md:gap-6 lg:gap-4 2xl:gap-8 flex-1'>
                        <Image
                            src='/images/fourthDubaiBg.png'
                            fill
                            alt='Dubai'
                            className='rounded-t-3xl w-full h-full object-cover absolute z-[-2]' 
                        />
                        {/* <div className='z-[-1] bg-[rgba(110,37,37,0.70)] w-full h-full top-0 rounded-3xl absolute' /> */}
                        <div className='flex flex-col justify-center items-center py-1 gap-2.5 overflow-hidden'>
                            <motion.h1 initial={{ y: 150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.75 }} className='text-white font-bold max-md:hidden lg:text-5xl 2xl:text-6xl'>Unlock Easy Borrowing:</motion.h1>
                            <motion.h1 initial={{ y: 150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.75 }} className='text-white font-bold max-md:hidden lg:text-5xl 2xl:text-6xl'>Innovative Financial Tool Coming Soon</motion.h1>
                            <motion.h1 initial={{ y: 150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.75 }} className='text-white font-bold md:hidden text-center text-[28px] leading-[2.25rem]'>Unlock Easy Borrowing: Innovative Financial Tool Coming Soon</motion.h1>
                        </div>
                        <div className='flex flex-col justify-center items-center overflow-hidden'>
                            <motion.h4 initial={{ y: 150 }} animate={{ y: 0 }} transition={{ duration: 0.75 }} className='lg:text-lg 2xl:text-xl max-md:hidden font-light text-white'>Access easy, fast, and reliable banking products & borrowing with Loanee, </motion.h4>
                            <motion.h4 initial={{ y: 150 }} animate={{ y: 0 }} transition={{ duration: 0.75 }} className='lg:text-lg 2xl:text-xl max-md:hidden font-light text-white'>designed for your convenience, Register your interest now.</motion.h4>
                            <motion.h4 initial={{ y: 150 }} animate={{ y: 0 }} transition={{ duration: 0.75 }} className='text-sm text-center md:hidden font-light text-white'>Access easy, fast, and reliable banking products & borrowing with Loanee, designed for your convenience, Register your interest now.</motion.h4>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <div className='flex items-center justify-between gap-4 max-md:px-6 max-md:h-11'>
                                <input
                                    type='text'
                                    placeholder='Enter your email'
                                    className='rounded-[0.5rem] max-md:min-h-full px-3.5 lg:p-2.5 2xl:p-3.5 border outline-none border-white w-screen max-w-[180px] sm:max-w-[240px] md:max-w-[468px] bg-[#CBBEBD] text-black placeholder:text-black text-sm' 
                                />
                                <button className='px-4 max-md:min-h-full text-nowrap lg:p-2.5 2xl:py-3.5 2xl:px-8 bg-[#ff0000] text-white font-medium rounded-[0.5rem] text-sm'>
                                    Get Notified
                                </button>
                            </div>
                            <p className='text-xs lg:text-sm xl:text-base font-light text-white'>Get notified on launch of your personal finance assistant</p>
                        </div>
                    </section>
                </section>
                <motion.section ref={secondTargetRef} className={cn('relative flex-1 flex flex-col items-center justify-center w-full')}>
                        <motion.div style={{ opacity: opacityBg }} className='fixed z-[4] -top-[18vh] md:-top-[25vh] max-md:-right-10 md:left-0 max-md:max-w-[256px] max-md:max-h-[417px] max-md:scale-x-[-1]'>
                            <Image
                                src='/images/triangleBg.svg'
                                width={782}
                                height={1113}
                                alt='Dubai'
                            />
                        </motion.div>
                    <motion.div
                        style={{ top, scale, rotate, left }}
                        // initial={innerWidth > 768 ? {} : { left: 'calc(50% - 100px)' }}
                        className={cn('-top-[20vh] w-[200px] h-[409px] md:w-[400px] md:h-[818px] z-[99999]', position)}
                    >
                        {innerWidth > 768 ? (
                            // <Image
                            //     src={`/images/${imageShown}`}
                            //     alt='Phone'
                            //     width={400}
                            //     height={818}
                            //     priority={true}
                            // />
                            <Image
                                src={`/images/${imageShown}`}
                                alt='Phone'
                                width={400}
                                height={818}
                                priority={true}
                            />
                        ) : (
                            <Image
                                src={`/images/${imageShown}`}
                                alt='Phone'
                                width={200}
                                height={409}
                                priority={true}
                            />
                        )}  
                        {imageDemo.began && <div onMouseDown={() => setImageDemo(prev => ({...prev, clicked: !prev.clicked}))} className={cn('bg-transparent opacity-20 w-full absolute cursor-pointer z-[9999999999]', imageDemo.clickPos)} />}                
                        {imageDemo.began && imageDemo.image === 'demoIphoneSeventh.png' && (
                            <>
                                <iframe className='absolute max-w-[25%] h-[22%] max-md:h-[18%] z-[12] top-[36.2%] left-[38%]' src="https://lottie.host/embed/750089d4-57f1-4eee-905f-320f4d1bd426/dJ9Ay5cVnY.json"/>                    
                                <div className='absolute bg-[#f8f7f7] z-[11] w-[15%] h-[7.5%] top-[41.1%] left-[42%]' />
                            </>
                        )}
                        {imageDemo.began && imageDemo.image === 'demoIphoneSixth.png' && (
                            <>
                                <iframe className='absolute max-w-[65.25%] h-[25%] max-md:h-[25.75%] z-[12] bottom-[18%] left-[17.85%] bg-gradient-to-b from-[#F5F3F3] to-[#FAFAFA]' src="https://lottie.host/embed/3b0bcb06-2fa8-4678-8fda-ba680b1fa639/pUiwIQlYOj.json"></iframe>                
                            </>
                        )}
                    </motion.div>
                    <div className='flex-1 flex items-center justify-center w-full min-h-screen max-md:flex-col'>
                        <div className='flex-1' />
                        <motion.div style={{ opacity: innerWidth > 768 ? 1 : firstFeatureOpacity }} className='flex max-md:overflow-hidden md:flex-1 flex-col gap-4 overflow-hidden md:pl-[15%]'>
                            <p className='uppercase font-bold text-[#ff0000] text-sm'>Instant Financial Services</p>
                            <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Access pre-approved financial services like loans, credit cards, and bank account opening efficiently and easily, from a wide range of banks and lenders.</p>
                        </motion.div>
                        
                    </div>
                    <div className='flex-1 flex items-center justify-center w-full min-h-screen max-md:flex-col'>
                        <div className='flex-1' />
                        <motion.div style={{ opacity: innerWidth > 768 ? 1 : secondFeatureOpacity }} className='flex max-md:overflow-hidden md:flex-1 flex-col gap-4 overflow-hidden md:pl-[15%]'>
                            <p className='uppercase font-bold text-[#ff0000] text-sm'>Pre-approved Personalised Offers</p>
                            <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Receive personalized pre-approved banking offers tailored to your credit score. </p>
                        </motion.div>
                    </div>
                    <div className='flex-1 flex items-center justify-center w-full min-h-screen max-md:flex-col'>
                        <div className='flex-1' />
                        <motion.div style={{ opacity: innerWidth > 768 ? 1 : thirdFeatureOpacity }} className='flex max-md:overflow-hidden md:flex-1 flex-col gap-4 overflow-hidden md:pl-[15%]'>
                            <p className='uppercase font-bold text-[#ff0000] text-sm'>Peace of Mind</p>
                            <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Enhance your security with secure registration, logins and data sharing via the trusted UAE PASS system.</p>
                        </motion.div>
                    </div>
                    <div className='flex-1 flex items-center justify-center w-full min-h-screen max-md:flex-col'>
                        <div className='flex-1' />
                        <motion.div style={{ opacity: innerWidth > 768 ? 1 : fourthFeatureOpacity }} className='flex max-md:overflow-hidden md:flex-1 flex-col gap-4 overflow-hidden md:pl-[15%]'>
                            <p className='uppercase font-bold text-[#ff0000] text-sm'>Know Your Credit Report</p>
                            <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Enhance your financial knowledge with insightful credit report analysis and make informed decisions that match your financial goals.</p>
                        </motion.div>
                    </div>
                    <div className='flex-1 flex items-center justify-center w-full min-h-screen max-md:flex-col'>
                        <div className='flex-1' />
                        <motion.div style={{ opacity: innerWidth > 768 ? 1 : fifthFeatureOpacity }} className='flex max-md:overflow-hidden md:flex-1 flex-col gap-4 overflow-hidden md:pl-[15%]'>
                            <p className='uppercase font-bold text-[#ff0000] text-sm'>Easy Product Comparison</p>
                            <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Streamline your decision-making by easily comparing a range of financial products to find the best fit for your needs.</p>
                        </motion.div>
                    </div>
                    <div className='flex-1 flex items-center justify-center w-full min-h-screen md:px-2'>
                        <div className='relative flex flex-col items-center justify-start gap-2 md:gap-4 w-full h-[95vh] md:pt-10 md:pb-16 rounded-3xl overflow-hidden max-md:justify-between max-md:pt-16 max-md:pb-4'>
                            <Image
								src='/images/triangleDemo.svg'
								width={782}
								height={1113}
								alt='Dubai'
								className='absolute z-[2] opacity-5 bottom-0'
                            />
                            <Image
								src='/images/demoBackground.png'
								fill
								alt='demo background'
								className='absolute z-[1] bottom-0'
                            />
                            {footerShown ? (
                                <div className='max-h-fit z-10 text-white'>
                                    <motion.p className='font-semibold text-xl md:text-3xl mb-auto py-1'>
                                        Try the Loanee Demo Now
                                    </motion.p>
                                </div>
                            ) : (
                                <div className='max-h-fit overflow-hidden z-10 text-white'>
                                    <motion.p style={{ y: tryText }} className='font-semibold text-lg md:text-3xl mb-auto'>
                                        Try the Loanee Demo Now
                                    </motion.p>
                                </div>
                            )}
                            {footerShown && <Image
                                src={`/images/${imageShown}`}
                                alt='Phone'
                                width={400}
                                height={818}
                                // initial={{ left: 'calc(50% - 200px)' }}
                                // exit={{ rotate: -4, position: 'fixed', bottom: '-550px', y: 'calc(50vh - 228px)', left: 'calc(36.2% - 150px)', opacity: 0.95, width: '300px', height: '614px'}}
                                // transition={{ duration: 0.40, ease: 'easeInOut' }}
                                className='absolute scale-75 top-[25px] z-[15]'
                            />}
                            {!imageDemo.finished ? (
                                <p onMouseDown={() => {
                                    setImageDemo(prev => ({...prev, clicked: true, image: 'demoIphoneTenth.png'}))
                                    setTimeout(() => {
                                        window.scrollTo({
                                            top: document.body.scrollHeight,
                                            behavior: 'smooth'
                                        })
                                    }, 200)
                                }} className='underline cursor-pointer mt-10 z-50 md:absolute md:bottom-10 right-4 md:right-10 font-semibold max-md:text-sm text-white'>Skip Demo</p>
                            ) : (
                                <button 
                                    onMouseDown={() => {
                                        setImageDemo((prev) => ({...prev, image: 'demoIphoneTwelvth.png', clickPos: 'top-[85.5%] h-[80px] w-[80px] left-[40%] rounded-full', clicked: false, finished: false}))
                                        setImageShown('demoIphoneTwelvth.png')
                                        setPosition('fixed')
                                        setFooterShown(false)
                                    }}
                                    className='md:absolute mt-10 z-50 md:bottom-10 md:right-10 md:rounded-full text-sm md:text-base font-semibold px-2 py-1.5 md:px-6 md:py-3 md:border md:border-black max-md:underline text-white'
                                >
                                    Restart (R)
                                </button>
                            )}
                        </div>
                    </div>
                </motion.section>
                {signUpFormShown && (
                    <Dialog open={signUpFormShown}>
                        <DialogContent className='bg-[#F7F3F6] flex flex-col max-md:items-center gap-10 py-10 px-6 max-md:min-w-[320px] max-md:max-w-[320px] md:min-w-[720px] z-[99999999999999]'>
                            <DialogHeader className='font-bold text-lg'>
                                Please fill out this form for free demo
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col max-w-full items-center justify-center">
                                    <div className='flex flex-col gap-8'>
                                        <div className='flex max-md:flex-col gap-6'>
                                            <FormField
                                                control={form.control}
                                                name="fistName"
                                                render={({ field }) => (
                                                    <FormItem className='relative'>
                                                        <FormControl>
                                                            <input
                                                                placeholder="First name" 
                                                                className='rounded-xl bg-white outline-none px-4 py-3.5 w-screen max-w-[280px] md:max-w-[328px]'
                                                                {...field} 
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='text-red-500 absolute -bottom-6 left-2' />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="jobTitle"
                                                render={({ field }) => (
                                                    <FormItem className='relative'>
                                                        <FormControl>
                                                            <input
                                                                placeholder="Job title" 
                                                                className='rounded-xl bg-white outline-none px-4 py-3.5 w-screen max-w-[280px] md:max-w-[328px]'
                                                                {...field} 
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='text-red-500 absolute -bottom-6 left-2' />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='flex max-md:flex-col gap-6'>
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem className='relative'>
                                                        <FormControl>
                                                            <input
                                                                placeholder="Email id" 
                                                                className='rounded-xl bg-white outline-none px-4 py-3.5 w-screen max-w-[280px] md:max-w-[328px]'
                                                                {...field} 
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='text-red-500 absolute -bottom-6 left-2' />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="mobile"
                                                render={({ field }) => (
                                                    <FormItem className='relative'>
                                                        <FormControl>
                                                            <div className='w-screen max-w-[280px] md:max-w-[328px] flex rounded-xl overflow-hidden'>
                                                                <select defaultValue="+1-284" className='bg-white outline-none px-0 w-fit'>
                                                                    {countryDialingCodes.map((code) => (
                                                                        <option key={code} value={code}>
                                                                            {code}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <input
                                                                    placeholder="Mobile number" 
                                                                    className='bg-white outline-none px-4 py-3.5 flex-1'
                                                                    {...field} 
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage className='text-red-500 absolute -bottom-6 left-2' />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        type='submit'
                                        className='rounded-2xl bg-[#EE0000] w-full py-3.5 text-white text-base font-semibold mt-10'
                                    >
                                        Submit form
                                    </button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                )}
            </section>
            {footerShown && signUpFormSubmitted && (
                <motion.section key="footer" initial={{ y: '100vh' }} animate={{ y: '0' }} transition={{ duration: 0.75 }} exit={{ y: '100vh' }} className='flex gradient-footer sticky top-0 min-h-screen flex-col items-center justify-end z-20'>
                    <section className='relative flex flex-col items-center justify-end gap-6 2xl:gap-8 flex-1 overflow-hidden w-full'>
                        <Image
                            src='/images/footerTop.svg'
                            width={250}
                            height={439}
                            alt='Footer Background Top'
                            className='absolute z-[10000] right-0 top-0 max-md:max-w-[173px]'
                        />
                        <Image
                            src='/images/footerBottom.svg'
                            width={439}
                            height={439}
                            alt='Footer Background Top'
                            className='absolute z-[10000] left-0 bottom-0 max-md:max-w-[173px]'
                        />
                        <Image
                            src="/images/logo.svg"
                            alt="Loanee"
                            width={195}
                            height={50}
                            className='max-md:max-w-36 lg:-mb-6 2xl:-mb-4 max-2xl:w-[140px]'
                        />
                        <div className='flex flex-col justify-center items-center gap-2.5 overflow-hidden lg:-mb-6 2xl:-mb-4'>
                            <motion.h1 initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.75 }} className='text-black max-md:hidden font-bold lg:text-4xl 2xl:text-6xl'>Streamlining Your Financial &</motion.h1>
                            <motion.h1 initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.75 }} className='text-black max-md:hidden font-bold lg:text-4xl 2xl:text-6xl'>Borrowing Experience, Launching Soon!</motion.h1>
                            <motion.h1 initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.75 }} className='text-black font-bold md:hidden text-center text-[28px] px-4 leading-[2.25rem]'>Streamlining Your Financial & Borrowing Experience, Launching Soon!</motion.h1>
                            <motion.h4 initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.75 }}	className='text 2xl:text-xl max-md:hidden font-light text-black mt-2'>Register your details and stay tuned</motion.h4>
                        </div>
                        <h4	className='text-sm md:hidden font-light text-black mt-4 lg:-mb-6 2xl:-mb-4'>Register your details and stay tuned</h4>
                        <div className='flex items-center justify-center md:mt-2 gap-4 lg:-mb-6 2xl:-mb-4'>
                            <Image
                                src='/images/appstore.png'
                                width={120} 
                                height={40}
                                alt='App Store'
                                className='max-md:max-w-24'
                            />
                            <Image
                                src='/images/playstore.png'
                                width={120} 
                                height={40}
                                alt='App Store' 
                                className='max-md:max-w-24'
                            />
                        </div>
                        <Image
                            src='/images/footerphones.png'
                            width={533}
                            height={410}
                            alt='Footer Phones'
                            className='max-2xl:w-[390px]'
                        />
                    </section>
                    <div className='px-4 py-6 md:px-20 gap-8 items-center justify-between bg-[#F7F4F6] flex w-full max-md:flex-col'>
                        <div className='gap-4 md:gap-10 flex max-md:w-full max-md:items-center max-md:justify-center'>
                            <p className='text-sm cursor-pointer max-md:font-semibold'>Terms</p>
                            <p className='text-sm cursor-pointer max-md:font-semibold'>Privacy</p>
                            <p className='text-sm cursor-pointer max-md:font-semibold'>Cookie policy</p>
                        </div>
                        <div className='gap-5 md:gap-10 flex max-md:w-full max-md:items-center max-md:justify-center'>
                            <Image
                                src='/images/twitter.png'
                                width={18}
                                height={18}
                                alt='Twitter'
                                className='cursor-pointer max-md:max-w-4'
                            />
                            <Image
                                src='/images/instagram.png'
                                width={18}
                                height={18}
                                alt='Instagram'
                                className='cursor-pointer max-md:max-w-4'
                            />
                            <Image
                                src='/images/facebook.png'
                                width={18}
                                height={18}
                                alt='Facebook'
                                className='cursor-pointer max-md:max-w-4'
                            />
                            <Image
                                src='/images/linkedin.png'
                                width={18}
                                height={18}
                                alt='Linkedin'
                                className='cursor-pointer max-md:max-w-4'
                            />
                        </div>
                    </div>
                </motion.section>
            )}
        </>
    )
}