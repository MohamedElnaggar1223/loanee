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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

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
	'top-[85.5%] h-[80px] w-[80px] left-[40%] rounded-full',
	'top-[85.5%] h-[80px] w-[80px] left-[40%] rounded-full',
	'top-[23.45%] h-[75px]',
	'top-[23.45%] h-[75px]',
	'top-[85%] h-[45px]',
	'top-[85%] h-[45px]',
	'top-[87.5%] h-[45px]',
	'top-[87.5%] h-[45px]',
	'top-[800%] h-[45px]',
	'top-[75%] h-[25%]',
	'top-[87.5%] h-[45px] left-[53.5%] w-[36.25%]',
	'top-[87.5%] h-[45px] left-[53.5%] w-[36.25%]',
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
		clickPos: 'top-[85.5%] h-[80px] w-[80px] left-[40%] rounded-full',
		clicked: false,
		finished: false,
        began: false
	})

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

    const top = useTransform(scrollYProgress, [0, (1/6)], [-250, 25])
    const scale = useTransform(scrollYProgress, [0, (1/6)], [1, 0.75])
    const rotate = useTransform(scrollYProgress, [0, (1/6), (2/6), (3/6), (4/6), (5/6), 1], [0, -4, -2, 0, 2, 4, 0])
    const left = useTransform(scrollYProgress, [0, (1/6), (5/6), 1], ['calc(50% - 200px)', 'calc(36.2% - 150px)', 'calc(36.2% - 150px)', 'calc(50% - 200px)'])
    const tryText = useTransform(scrollYProgress, [(5/6), 1], [-100, 0])

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
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
        if(value === 1 && !imageDemo.began) {
            setImageDemo(prev => ({...prev, began: true}))
            if(!signUpFormSubmitted) setSignUpFormShown(true)
        }
        else if(value === 1) {
            if(!signUpFormSubmitted) setSignUpFormShown(true)
        }
        else if(value <= 1) {
            setImageDemo({
                began: false,
                image: 'demoIphoneTwelvth.png',
                clicked: false,
                clickPos: 'top-[85.5%] h-[80px] w-[80px] left-[40%] rounded-full',
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
                <section className='flex flex-col max-h-screen flex-1 z-30 min-h-screen'>
                    <Header />
                    <section className='relative rounded-t-3xl flex flex-col pt-20 px-4 items-center gap-8 flex-1'>
                        <Image
                            src='/images/fourthDubaiBg.png'
                            fill
                            alt='Dubai'
                            className='rounded-t-3xl w-full h-full object-cover absolute z-[-2]' 
                        />
                        {/* <div className='z-[-1] bg-[rgba(110,37,37,0.70)] w-full h-full top-0 rounded-3xl absolute' /> */}
                        <div className='flex flex-col justify-center items-center gap-2.5 overflow-hidden'>
                            <motion.h1 initial={{ y: 150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.75 }} className='text-white font-bold max-md:hidden text-6xl'>Your personal finance</motion.h1>
                            <motion.h1 initial={{ y: 150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.75 }} className='text-white font-bold max-md:hidden text-6xl'>assistant is on the way</motion.h1>
                            <motion.h1 initial={{ y: 150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.75 }} className='text-white font-bold md:hidden text-center text-[32px] px-2 leading-[2.25rem]'>Your personal finance assistant is on the way</motion.h1>
                        </div>
                        <div className='flex flex-col justify-center items-center overflow-hidden'>
                            <motion.h4 initial={{ y: 150 }} animate={{ y: 0 }} transition={{ duration: 0.75 }} className='text-xl max-md:hidden font-light text-white'>Get an overview of your finances, tips to improve your score, and</motion.h4>
                            <motion.h4 initial={{ y: 150 }} animate={{ y: 0 }} transition={{ duration: 0.75 }} className='text-xl max-md:hidden font-light text-white'>personalised offers. All in one place.</motion.h4>
                            <motion.h4 initial={{ y: 150 }} animate={{ y: 0 }} transition={{ duration: 0.75 }} className='text-sm text-center md:hidden font-light text-white'>Get an overview of your finances, tips to improve your score, and personalised offers. All in one place.</motion.h4>
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
                <motion.section ref={secondTargetRef} className={cn('relative flex-1 flex flex-col items-center justify-center w-full')}>
                    <motion.div
                        style={{ top, scale, rotate, left }}
                        className={cn('-top-[250px] w-[400px] h-[818px] z-[99999]', position)}
                    >
                        <Image
                            src={`/images/${imageShown}`}
                            alt='Phone'
                            width={400}
                            height={818}
                            priority={true}
                        />
                        {imageDemo.began && <div onMouseDown={() => setImageDemo(prev => ({...prev, clicked: !prev.clicked}))} className={cn('bg-transparent opacity-20 w-full absolute cursor-pointer z-[9999999999]', imageDemo.clickPos)} />}                </motion.div>
                    <div className='flex-1 flex items-center justify-center w-full min-h-screen'>
                        <div className='flex-1' />
                        <div className='flex flex-1 flex-col gap-4 overflow-hidden pl-[15%]'>
                            <p className='uppercase font-bold text-[#ff0000] text-sm'>Financial Services</p>
                            <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Access financial services such as borrowing loans, take a credit card, and opening a bank account.</p>
                        </div>
                        
                    </div>
                    <div className='flex-1 flex items-center justify-center w-full min-h-screen'>
                        <div className='flex-1' />
                        <div className='flex flex-1 flex-col gap-4 overflow-hidden pl-[15%]'>
                            <p className='uppercase font-bold text-[#ff0000] text-sm'>Personalized Offers</p>
                            <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Receive customized offers based on your credit score and enjoy pre-approved financial products for you.</p>
                        </div>
                    </div>
                    <div className='flex-1 flex items-center justify-center w-full min-h-screen'>
                        <div className='flex-1' />
                        <div className='flex flex-1 flex-col gap-4 overflow-hidden pl-[15%]'>
                            <p className='uppercase font-bold text-[#ff0000] text-sm'>Secure Access</p>
                            <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Ensure secure login and registration through the trusted UAE PASS system, enhancing your safety.</p>
                        </div>
                    </div>
                    <div className='flex-1 flex items-center justify-center w-full min-h-screen'>
                        <div className='flex-1' />
                        <div className='flex flex-1 flex-col gap-4 overflow-hidden pl-[15%]'>
                            <p className='uppercase font-bold text-[#ff0000] text-sm'>Financial Guide</p>
                            <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Gain valuable insights into credit reports and make right financial decisions that align with your goals.</p>
                        </div>
                    </div>
                    <div className='flex-1 flex items-center justify-center w-full min-h-screen'>
                        <div className='flex-1' />
                        <div className='flex flex-1 flex-col gap-4 overflow-hidden pl-[15%]'>
                            <p className='uppercase font-bold text-[#ff0000] text-sm'>Product Comparison</p>
                            <p className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>Easily compare various financial products to choose the ones that best suit your needs.</p>
                        </div>
                    </div>
                    <div className='flex-1 flex items-center justify-center w-full min-h-screen px-12'>
                        <div className='relative flex flex-col items-center justify-start gap-2 md:gap-4 bg-[#F1E8E6] w-full h-[95vh] md:pt-10 md:pb-16 rounded-3xl overflow-hidden'>
                            {footerShown ? (
                                <div className='max-h-fit'>
                                    <motion.p className='font-semibold text-xl md:text-3xl mb-auto'>
                                        Let's try a free demo
                                    </motion.p>
                                </div>
                            ) : (
                                <div className='max-h-fit overflow-hidden'>
                                    <motion.p style={{ y: tryText }} className='font-semibold text-xl md:text-3xl mb-auto'>
                                        Let's try a free demo
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
                                className='absolute scale-75 top-[25px]'
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
                                }} className='underline cursor-pointer mt-10 z-50 md:absolute md:bottom-10 right-4 md:right-10 font-semibold max-md:text-sm'>Skip Demo</p>
                            ) : (
                                <button 
                                    onMouseDown={() => {
                                        setImageDemo((prev) => ({...prev, image: 'demoIphoneTwelvth.png', clickPos: 'top-[85.5%] h-[80px] w-[80px] left-[40%] rounded-full', clicked: false, finished: false}))
                                        setImageShown('demoIphoneTwelvth.png')
                                        setPosition('fixed')
                                        setFooterShown(false)
                                    }}
                                    className='md:absolute mt-10 z-50 md:bottom-10 md:right-10 md:rounded-full text-sm md:text-base font-semibold px-2 py-1.5 md:px-6 md:py-3 md:border md:border-black max-md:underline'
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
                                                            <input
                                                                placeholder="Mobile number" 
                                                                className='rounded-xl bg-white outline-none px-4 py-3.5 w-screen max-w-[280px] md:max-w-[328px]'
                                                                {...field} 
                                                            />
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
                    <section className='flex flex-col items-center justify-end gap-6 flex-1'>
                        <Image
                            src="/images/logo.svg"
                            alt="Loanee"
                            width={195}
                            height={50}
                            className='max-md:max-w-36'
                        />
                        <div className='flex flex-col justify-center items-center gap-2.5 overflow-hidden'>
                            <motion.h1 initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.75 }} className='text-black max-md:hidden font-bold text-6xl'>Your personal finance</motion.h1>
                            <motion.h1 initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.75 }} className='text-black max-md:hidden font-bold text-6xl'>assistant is coming soon</motion.h1>
                            <motion.h1 initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.75 }} className='text-black font-bold md:hidden text-center text-[32px] px-10 leading-[2.25rem]'>Your personal finance assistant is coming soon</motion.h1>
                            <motion.h4 initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.75 }}	className='text-xl max-md:hidden font-light text-black mt-2'>Get notified and stay tuned!</motion.h4>
                        </div>
                        <h4	className='text-sm md:hidden font-light text-black mt-4'>Get notified and stay tuned!</h4>
                        <div className='flex items-center justify-center md:mt-2 gap-4'>
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
                        />
                    </section>
                    <div className='px-4 py-6 md:px-20 gap-8 items-center justify-between bg-[#F7F4F6] flex w-full'>
                        <div className='gap-4 md:gap-10 flex'>
                            <p className='text-xs md:text-sm cursor-pointer max-md:font-semibold'>Terms</p>
                            <p className='text-xs md:text-sm cursor-pointer max-md:font-semibold'>Privacy</p>
                            <p className='text-xs md:text-sm cursor-pointer max-md:font-semibold'>Cookie policy</p>
                        </div>
                        <div className='gap-5 md:gap-10 flex'>
                            <Image
                                src='/images/twitter.png'
                                width={18}
                                height={18}
                                alt='Twitter'
                                className='cursor-pointer max-md:max-w-3'
                            />
                            <Image
                                src='/images/instagram.png'
                                width={18}
                                height={18}
                                alt='Instagram'
                                className='cursor-pointer max-md:max-w-3'
                            />
                            <Image
                                src='/images/facebook.png'
                                width={18}
                                height={18}
                                alt='Facebook'
                                className='cursor-pointer max-md:max-w-3'
                            />
                            <Image
                                src='/images/linkedin.png'
                                width={18}
                                height={18}
                                alt='Linkedin'
                                className='cursor-pointer max-md:max-w-3'
                            />
                        </div>
                    </div>
                </motion.section>
            )}
        </>
    )
}