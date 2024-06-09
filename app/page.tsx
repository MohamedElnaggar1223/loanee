'use client'
import Header from "@/components/Header";
import { AnimatePresence, useInView, motion, useMotionValueEvent, useScroll, useTransform, useWillChange } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lenis from 'lenis'
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { X } from "lucide-react"

const demoImagesRotation = [
	'iphoneSecond.png',
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
	'top-[26.25%] h-[60px]',
	'top-[26.25%] h-[60px]',
	'top-[26.25%] h-[60px]',
	'top-[88.2%] h-[34px]',
	'top-[88.2%] h-[34px]',
	'top-[90.75%] h-[34px]',
	'top-[90.75%] h-[34px]',
	'top-[800%] h-[34px]',
	'top-[79.75%] h-[20%]',
	'top-[90.75%] h-[34px] left-[53.5%] w-[36.25%]',
	'top-[90.75%] h-[34px] left-[53.5%] w-[36.25%]',
	'top-[40rem]',
]

export default function Home() {
	const [scrolled, setScrolled] = useState(false)
	const [image, setImage] = useState('iphoneFirst.png')
	const [imageDemo, setImageDemo] = useState({
		image: 'iphoneSecond.png',
		clickPos: 'top-[26.25%] h-[60px]',
		clicked: false,
		finished: false,
	})
	const [title, setTitle] = useState('Financial Services')
	const [text, setText] = useState('Access financial services such as borrowing loans, take a credit card, and opening a bank account.')
	const [textAnimation, setTextAnimation] = useState('enter')
	const [demoShown, setDemoShown] = useState(false)
	const [signUpFormShown, setSignUpFormShown] = useState(false)
	const [signUpFormSubmitted, setSignUpFormSubmitted] = useState(false)
	const [footerShown, setFooterShown] = useState(false)
	const [demoButton, setDemoButton] = useState('skip')
	const [innerWidth, setInnerWidth] = useState(0)

	useEffect(() => {
		setInnerWidth(window.innerWidth)
	}, [])

	const willChange = useWillChange()

	const mainSection = useRef<HTMLDivElement>(null)
	const targetRef = useRef<HTMLDivElement>(null)
	const secondTargetRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => 1 - Math.pow(1 - t, 3),
			lerp: 0.1,
			smoothWheel: true,
			touchMultiplier: 0.2,
			wheelMultiplier: 0.09,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => lenis.destroy();
	}, []);

	
	const { scrollY } = useScroll({
		target: targetRef,
		offset: ['start start', 'end start']
    })
	
	const { scrollYProgress, scrollY: scrollYSecond, scrollX: scrollXSecond } = useScroll({
		target: secondTargetRef,
		offset: ['start start', 'end end']
    })
	
	// useEffect(() => {
	// 	// const scrollBack = (e: Event) => {
	// 	// 	e.preventDefault();
	// 	// 	console.log(scrollXSecond.getPrevious(), scrollYSecond.getPrevious())
	// 	// 	if(signUpFormShown) window.scrollTo(scrollXSecond.getPrevious()!, scrollYSecond.getPrevious()!);
	// 	// };

	// 	// window.addEventListener('scroll', scrollBack);

	// 	// return () => {
	// 	// 	window.removeEventListener('scroll', scrollBack);
	// 	// };

	// 	if(signUpFormSubmitted) {
	// 		const targetElement = secondTargetRef.current;
    //         // const specificPoint = 0.90; // 40% of the target element's height

    //         // // Calculate the exact scroll position within the target element
    //         // const elementTop = (targetElement?.getBoundingClientRect()?.top ?? 0) + window.scrollY;
    //         // const elementHeight = targetElement?.getBoundingClientRect().height;
    //         // const scrollToPosition = elementTop + ((elementHeight ?? 0) * specificPoint);

	// 		// console.log(scrollToPosition, window.scrollY)

    //         // window.scrollTo({
    //         //     top: scrollToPosition,
    //         // });

	// 		window.scrollTo({
	// 			top: document.body.scrollHeight * 0.28,
	// 		})
	// 	}

	// }, [signUpFormSubmitted]);

	// const translate = useTransform(scrollYProgress, [0, 0.75, 1], ['300px', '0px', '-300px'])
	// const rotate = useTransform(scrollYProgress, (pos) => {
	// 	console.log(pos)
	// 	return pos > 0.1 ? 0 : -4
	// })

	// const rotate = useTransform(scrollYProgress, [0, 0.50, 0.70, 0.50, 0.70], [-4, -2, 0, 2, 4])
	// const imageVal = useTransform(scrollYProgress, [0, 0.50, 0.70, 0.50, 2420], ['iphoneFirst.png', 'iphoneSecond.png', 'iphoneThird.png', 'iphoneSecond.png', 'iphoneSecond.png'])
	// const titleVal = useTransform(scrollYProgress, [0, 0.50, 0.70, 0.50, 0.90], ['Financial Services', 'Personalized Offers', 'Secure Access', 'Financial Guide', 'Product Comparison'])
	// const textVal = useTransform(scrollYProgress, [0, 0.50, 0.70, 0.50, 0.224, ['Access financial services such as borrowing loans, take a credit card, and opening a bank account.', 'Receive customized offers based on your credit score and enjoy pre-approved financial products for you.', 'Ensure secure login and registration through the trusted UAE PASS system, enhancing your safety.', 'Gain valuable insights into credit reports and make right financial decisions that align with your goals.', 'Easily compare various financial products to choose the ones that best suit your needs.']24
	
	// const rotateVal = useTransform(scrollYProgress, (pos) => {
	// 	if(pos <= 0.50) return -4
	// 	else if(pos <= 0.70) return -2
	// 	else if(pos <= 0.50) return 0
	// 	else if(pos <= 0.70) return 2
	// 	else if(pos <= 0.90) return 4
	// 	// if(pos <= 0.50) return -4
	// 	// else cycleRotate()
	// })

	const rotateVal = useTransform(scrollYProgress, [0.09, 0.23, 0.37, 0.51, 0.65], [-4, -2, 0, 2, 4])
	const tryText = useTransform(scrollYProgress, [0.65, 0.68], [-100, 0])
	const iphoneDemoStart = useTransform(scrollYProgress, [0.65, 0.68], [0, 20])

	const delay = useTransform(scrollYProgress, (pos) => {
		if(pos < 0.09) return 0.5
		else return 0
	})

	const duration = useTransform(scrollYProgress, (pos) => {
		if(pos < 0.09) return 0.1
		else return 1
	})

	const bgInitial = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.09) return { opacity: 0 }
		else return { opacity: 1 }
	})

	const iphoneInitial = useTransform(scrollYProgress, (pos) => {
		console.log(pos)
		if(pos < 0.09) return { opacity: 0 }
		else return { opacity: 1 }
	})

	const imageVal = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.09) return 'iphoneFirst.png'
		else if(pos <= 0.23) return 'iphoneSecond.png'
		else if(pos <= 0.37) return 'iphoneThird.png'
		else if(pos <= 0.51) return 'iphoneFourth.png'
		else if(pos <= 0.65) return 'iphoneFifth.png'
		else return 'showDemo'
	})

	const imageDemoVal = useTransform(scrollYProgress, (pos) => {
		// if(pos <= 0.43 && signUpFormClosed) {
		// 	return 'formClosed' 
		// }
		if(pos <= 0.68 || !signUpFormSubmitted) return 'iphoneSecond.png'
		else if(pos <= 69) return 'demoIphoneFirst.png'
		// else if(pos <= 0.53) return 'demoIphoneSecond.png'
		// else if(pos <= 0.58) return 'demoIphoneThird.png'
		// else if(pos <= 0.63) return 'demoIphoneFourth.png'
		// else if(pos <= 0.68) return 'demoIphoneFifth.png'
		// else if(pos <= 0.73) return 'demoIphoneSixth.png'
		// else if(pos <= 0.78) return 'demoIphoneSeventh.png'
		// else if(pos <= 0.83) return 'demoIphoneEighth.png'
		// else if(pos <= 0.88) return 'demoIphoneNinth.png'
		// else if(pos <= 0.93) return 'demoIphoneTenth.png'
		// else if(pos <= 0.98) return 'demoIphoneEleventh.png'
		// else return 'footerShown'
	})

	const titleVal = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.09) return 'Financial Services'
		else if(pos <= 0.23) return 'Personalized Offers'
		else if(pos <= 0.37) return 'Secure Access'
		else if(pos <= 0.51) return 'Financial Guide'
		else if(pos <= 0.65) return 'Product Comparison'
	})

	const textVal = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.09) return 'Access financial services such as borrowing loans, take a credit card, and opening a bank account.'
		else if(pos <= 0.23) return 'Receive customized offers based on your credit score and enjoy pre-approved financial products for you.'
		else if(pos <= 0.37) return 'Ensure secure login and registration through the trusted UAE PASS system, enhancing your safety.'
		else if(pos <= 0.51) return 'Gain valuable insights into credit reports and make right financial decisions that align with your goals.'
		else if(pos <= 0.65) return 'Easily compare various financial products to choose the ones that best suit your needs.'
	})

	useMotionValueEvent(scrollY, 'change', (pos) => {
        if (pos > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

	useMotionValueEvent(tryText, 'change', (pos) => {
		if(pos === 0 && !signUpFormSubmitted) setSignUpFormShown(true)
	})

	useMotionValueEvent(imageVal, 'change', (pos) => {
		console.log(pos)
		if(pos === 'showDemo') 
		{
			setDemoShown(true)
			setImageDemo({image: 'demoIphoneFirst.png', clickPos: 'top-[26.25%] h-[60px]', clicked: false, finished: false})
			if(scrolled) setScrolled(false)
		}
		else 
		{
			if(demoShown) setDemoShown(false)
			if(!scrolled) setScrolled(true)
			setImage(pos!)
			setTextAnimation('exit')
			setTimeout(() => {
				setTextAnimation('enter')
			}, 150)
		}
	})

	useMotionValueEvent(titleVal, 'change', (pos) => {
		setTitle(pos!)
	})

	useMotionValueEvent(textVal, 'change', (pos) => {
		setText(pos!)
	})

	useMotionValueEvent(imageDemoVal, 'change', (pos) => {
	// 	if(pos === 'footerShown') setFooterShown(true)
	// 	else
	// 	{
	// 		if(footerShown) setFooterShown(false)
		setImageDemo(prev => ({...prev, image: pos!}))
	// 	}
	})

	// useMotionValueEvent(scrollYProgress, 'change', (pos) => {
	// 	if(pos >= 0.93) setDemoButton('restart')
	// 	if(scrollYProgress.getPrevious()! >= 0.93 && pos <= 0.98) {
	// 		if(signUpFormClosed) {
	// 			window.scrollTo({
	// 				top: document.body.scrollHeight * 0.39,
	// 			})
	// 			setSignUpFormClosed(false)
	// 			setSignUpFormShown(true)
	// 		}
	// 		setFooterShown(false)
	// 		setDemoShown(true)
	// 	}
	// 	else if(pos >= 0.98) {
	// 		setFooterShown(true)
	// 	}
	// })

	useMotionValueEvent(scrollYProgress, 'change', (pos) => {
		if(pos > scrollYProgress.getPrevious()! && imageDemo.finished) {
			setFooterShown(true)
			setDemoShown(false)
			setScrolled(false)
		}
		else if((pos < scrollYProgress.getPrevious()!) && footerShown) {
			setImageDemo({image: 'demoIphoneFirst.png', clickPos: 'top-[26.25%] h-[60px]', clicked: false, finished: false})
			// window.scrollTo({
			// 	top: document.body.scrollHeight * 0.685,
			// })
			setFooterShown(false)
			// setScrolled(false)
			setDemoShown(true)
		}
		// else if(pos < scrollYProgress.getPrevious()! && demoImagesRotation[1] === imageDemo.image) {
		// 	setDemoShown(false)
		// 	setScrolled(true)
		// 	window.scrollTo({
		// 		top: document.body.scrollHeight * 0.645,
		// 	})
		// }
	})

	useEffect(() => {
		if(signUpFormSubmitted) setDemoButton('skip')
	}, [signUpFormSubmitted])

	useEffect(() => {
		if(imageDemo.clicked) {
			const index = demoImagesRotation.indexOf(imageDemo.image)
			let finished = false
			if(demoImagesRotation[index + 1] === 'demoIphoneEleventh.png') {
				finished = true
			}
			setImageDemo(() => ({image: demoImagesRotation[index + 1], clicked: false, clickPos: demoImagesClickPos[index + 1], finished}))
		}
		else if(imageDemo.image === 'demoIphoneSeventh.png') {
			setTimeout(() => {
				setImageDemo((prev) => ({...prev, clicked: true}))
			}, 2000)
		}
		// else if(imageDemo.finished) {
		// 	const index = demoImagesRotation.indexOf(imageDemo.image)
		// 	if(demoImagesRotation[index] === 'demoIphoneEleventh.png') {
		// 		window.scrollTo({
		// 			top: document.body.scrollHeight * 0.95,
		// 		})
		// 	}
		// }
	}, [imageDemo])

	useEffect(() => {
		if(footerShown) {
			window.scrollTo({
				top: document.body.scrollHeight,
			})
		}
	}, [footerShown])

	const MotionImage = motion(Image)

	return (
		<main ref={targetRef} className={cn("flex flex-col pt-6 no-scroll-bar min-h-[300vh]", !footerShown && 'px-5 md:px-12')}>
			<AnimatePresence mode={'popLayout'}>
				{!scrolled && !demoShown && !footerShown && (
					<motion.section exit={{ y: "-100vh" }} transition={{ duration: 0.5 }} key="firstHero" className='flex flex-col max-h-screen flex-1 z-30'>
						<Header />
						<section className='relative rounded-t-3xl flex flex-col pt-20 px-4 items-center gap-8 flex-1'>
							<Image
								src='/images/fourthDubaiBg.png'
								fill
								alt='Dubai'
								className='rounded-t-3xl w-full h-full object-cover absolute z-[-2]' 
							/>
							{/* <div className='z-[-1] bg-[rgba(110,37,37,0.70)] w-full h-full top-0 rounded-3xl absolute' /> */}
							<div ref={mainSection} className='flex flex-col justify-center items-center gap-2.5'>
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
							{innerWidth > 768 ? (
								<MotionImage
									src='/images/iphoneHero.png'
									alt='Phone'
									width={400}
									height={818}
									initial={{ left: 'calc(50% - 200px)' }}
									exit={{ rotate: -4, position: 'fixed', bottom: '-550px', y: 'calc(50vh - 228px)', left: 'calc(36.2% - 150px)', opacity: 0.65, width: '300px', height: '614px'}}
									transition={{ duration: 0.40, ease: 'easeInOut' }}
									className='fixed -bottom-[600px] w-[400px] h-[818px]'
									key='phone'
								/>
							) : (
								<MotionImage
									src='/images/iphoneHero.png'
									alt='Phone'
									width={200}
									height={409}
									initial={{ left: 'calc(50% - 100px)' }}
									exit={{ rotate: -4, position: 'fixed', bottom: '-120px', y: 'calc(50vh - 81px)', left: 'calc(75% - 177px)', opacity: 1, width: '187px', height: '383px'}}
									transition={{ duration: 0.40, ease: 'easeInOut' }}
									className='fixed -bottom-[175px] w-[200px] h-[409px]'
									key='phone'
								/>
							)}
						</section>
					</motion.section>
				)}
				{scrolled && !demoShown && !footerShown && (
					<motion.section ref={secondTargetRef} transition={{ duration: 0 }} key="secondHero" className={cn('flex sticky top-0 max-h-screen flex-1 items-center justify-center md:pl-[15%] z-20 max-md:flex-col')}>
						<MotionImage
							src='/images/triangleBg.svg'
							width={782}
							height={1113}
							alt='Dubai'
							className='absolute z-[-1] -left-20'
							// initial={bgInitial.get()}
							// animate={{ opacity: 1}}
							// transition={{ duration: 0, delay: 0.50 }}
							viewport={{ once: true }}
						/>
						{/* <div className='flex fixed top-0 h-full w-[calc(100vw-6rem)]'> */}
							<div className='flex flex-1 items-center justify-center'>
								{innerWidth > 768 ? (
									<MotionImage
										src={`/images/${image}`}
										alt='Phone'
										width={300}
										height={614}
										initial={iphoneInitial.get()}
										animate={{ opacity: 1 }}
										//@ts-expect-error rotate
										style={{ rotate: rotateVal, willChange }}
										transition={{ duration: duration.get(), ease: 'easeInOut', delay: delay.get() ?? 0.5 }}
										exit={scrolled ? { opacity: 0 } : undefined}
										className='max-h-[614px] max-w-[300px]'
										key='phone'
										viewport={{ once: true }}
										priority
										layoutId={!signUpFormSubmitted ? 'phone' : undefined}
									/>
								) : (
									<MotionImage
										src={`/images/${image}`}
										alt='Phone'
										width={187}
										height={383}
										initial={iphoneInitial.get()}
										animate={{ opacity: 1 }}
										//@ts-expect-error rotate
										style={{ rotate: rotateVal, willChange }}
										transition={{ duration: duration.get(), ease: 'easeInOut', delay: delay.get() ?? 0.5 }}
										exit={scrolled ? { opacity: 0 } : undefined}
										className='max-h-[383px] max-w-[187px]'
										key='phone'
										viewport={{ once: true }}
										priority
										layoutId={!signUpFormSubmitted ? 'phone' : undefined}
									/>
								)}
							</div>
							<motion.div className='flex flex-1 flex-col gap-4 overflow-hidden'>
								<motion.p variants={{ enter: { opacity: [0, 1], y: ['300px', '0px'] }, exit: { opacity: [0, 1], y: ['0px', '-300px'] }}} animate={textAnimation} transition={{ duration: 0.3, ease: 'easeInOut', delay: delay.get() ?? 0.5 }} className='uppercase font-bold text-[#ff0000] text-sm'>{title}</motion.p>
								<motion.p variants={{ enter: { opacity: [0, 1], y: ['300px', '0px'] }, exit: { opacity: [0, 1], y: ['0px', '-300px'] }}} animate={textAnimation} transition={{ duration: 0.3, ease: 'easeInOut', delay: delay.get() ?? 0.5 }} className='font-semibold max-w-[380px] text-[24px] leading-[2.25rem] md:text-[32px] md:leading-[2.75rem]'>{text}</motion.p>
							</motion.div>
						{/* </div> */}
					</motion.section>
				)}
				{demoShown && !footerShown && (
					<motion.section initial={{ y: '100vh' }} animate={{ y: '0' }} transition={{ duration: 0.75 }} exit={footerShown ? { y: '-100vh' } : {}} key='demo' className='flex sticky top-0 min-h-screen flex-col items-center justify-center gap-4 z-10'>
						<div className='relative flex flex-col items-center justify-center gap-2 md:gap-4 bg-[#F1E8E6] w-full h-[95vh] md:pt-20 md:pb-16 rounded-3xl overflow-hidden'>
							<MotionImage
								src='/images/demoTriangle.png'
								width={782}
								height={1113}
								alt='Dubai'
								className='absolute z-[11] bottom-0'
								initial={bgInitial.get()}
								animate={{ opacity: 1}}
								transition={{ duration: 0, delay: 0.50 }}
								viewport={{ once: true }}
							/>
							<div className='max-h-fit overflow-hidden'>
								<motion.p style={{ y: tryText }} className='font-semibold text-xl md:text-3xl'>
									Let's try a free demo
								</motion.p>
							</div>
							<div 
								onMouseDown={() => {
									if(demoImagesRotation[0] === imageDemo.image) setImageDemo(prev => ({...prev, clicked: !prev.clicked}))
								}} 
								className='relative'
							>
								{innerWidth > 768 ? (
									<MotionImage
										src={`/images/${imageDemo.image}`}
										alt='Phone'
										width={300}
										height={614}
										className='max-h-[614px] max-w-[300px] z-[12]'
										key='phone'
										layoutId={!signUpFormSubmitted ? 'phone' : undefined}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										style={{ y: iphoneDemoStart }}
										transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
									/>
									) : (
									<MotionImage
										src={`/images/${imageDemo.image}`}
										alt='Phone'
										width={306}
										height={624}
										className='max-h-[624px] max-w-[306px] z-[12]'
										key='phone'
										layoutId={!signUpFormSubmitted ? 'phone' : undefined}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										style={{ y: iphoneDemoStart }}
										transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
									/>

								)}
								<div onMouseDown={() => setImageDemo(prev => ({...prev, clicked: !prev.clicked}))} className={cn('z-[13] bg-transparent opacity-20 w-full absolute cursor-pointer', imageDemo.clickPos)} />
							</div>
							{!imageDemo.finished ? (
								<p onMouseDown={() => {
									setImageDemo(prev => ({...prev, clicked: true, image: 'demoIphoneTenth.png'}))
									setFooterShown(true)
								}} className='underline cursor-pointer mt-10 z-50 md:absolute md:bottom-10 right-4 md:right-10 font-semibold max-md:text-sm'>Skip Demo</p>
							) : (
								<button 
									onMouseDown={() => {
										setImageDemo({image: 'demoIphoneFirst.png', clickPos: 'top-[26.25%] h-[60px]', clicked: false, finished: false})
									}}
									className='md:absolute mt-10 z-50 md:bottom-10 md:right-10 md:rounded-full text-sm md:text-base font-semibold px-2 py-1.5 md:px-6 md:py-3 md:border md:border-black max-md:underline'
								>
									Restart (R)
								</button>
							)}
						</div>
					</motion.section>
				)}
				{footerShown && signUpFormSubmitted && (
					<motion.section key="footer" initial={{ y: '100vh' }} animate={{ y: '0' }} transition={{ duration: 0.75 }} exit={{ y: '100vh' }} className='flex gradient-footer sticky top-0 min-h-screen flex-col items-center justify-end z-20'>
						<section className='flex flex-col items-center justify-end gap-8 flex-1'>
							<Image
								src="/images/logo.svg"
								alt="Loanee"
								width={195}
								height={50}
								className='max-md:max-w-36'
							/>
							<div ref={mainSection} className='flex flex-col justify-center items-center gap-2.5'>
								<h1 className='text-black max-md:hidden font-bold text-6xl'>Your personal finance</h1>
								<h1 className='text-black max-md:hidden font-bold text-6xl'>assistant is coming soon</h1>
								<h1 className='text-black font-bold md:hidden text-center text-[32px] px-10 leading-[2.25rem]'>Your personal finance assistant is coming soon</h1>
								<h4	className='text-xl max-md:hidden font-light text-black mt-2'>Get notified and stay tuned!</h4>
							</div>
							<h4	className='text-sm md:hidden font-light text-black mt-4'>Get notified and stay tuned!</h4>
							<div className='flex items-center justify-center md:mt-4 gap-4'>
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
			</AnimatePresence>
			{signUpFormShown && (
				<Dialog open={signUpFormShown}>
					<DialogContent className='bg-[#F7F3F6] flex flex-col max-md:items-center gap-10 py-10 px-6 z-50 max-md:min-w-[320px] max-md:max-w-[320px] md:min-w-[720px]'>
						<DialogHeader className='font-bold text-lg'>
							Please fill out this form for free demo
						</DialogHeader>
						<div className='flex flex-col gap-6'>
							<div className='flex max-md:flex-col gap-6'>
								<input
									className='rounded-xl bg-white outline-none px-4 py-3.5 w-screen max-w-[280px] md:max-w-[458px]'
									type='text'
									placeholder='First Name' 
								/>
								<input
									className='rounded-xl bg-white outline-none px-4 py-3.5 w-screen max-w-[280px] md:max-w-[458px]'
									type='text'
									placeholder='Job title' 
								/>
							</div>
							<div className='flex max-md:flex-col gap-6'>
								<input
									className='rounded-xl bg-white outline-none px-4 py-3.5 w-screen max-w-[280px] md:max-w-[458px]'
									type='text'
									placeholder='Email id' 
								/>
								<input
									className='rounded-xl bg-white outline-none px-4 py-3.5 w-screen max-w-[280px] md:max-w-[458px]'
									type='text'
									placeholder='Mobile number' 
								/>
							</div>
						</div>
						<button 
							onMouseDown={() => {
								setSignUpFormShown(false)
								setSignUpFormSubmitted(true)
							}}
							className='rounded-2xl bg-[#EE0000] w-full py-3.5 text-white text-base font-semibold'
						>
							Submit form
						</button>
						{/* <div 
							onMouseDown={() => {
								setDemoShown(false)
								setSignUpFormShown(false)
								setFooterShown(true)
								setSignUpFormClosed(true)
								window.scrollTo({
									top: document.body.scrollHeight,
								})
							}} 
							className="absolute right-4 top-4 z-[999999999] cursor-pointer"
						>
							<X className="h-4 w-4" />
						</div> */}
					</DialogContent>
				</Dialog>
			)}
		</main>
	)
}
