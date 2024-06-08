'use client'
import Header from "@/components/Header";
import { AnimatePresence, useInView, motion, useMotionValueEvent, useScroll, useTransform, useWillChange } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lenis from 'lenis'
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { X } from "lucide-react"

export default function Home() {
	const [scrolled, setScrolled] = useState(false)
	const [image, setImage] = useState('iphoneFirst.png')
	const [imageDemo, setImageDemo] = useState('iphoneSecond.png')
	const [title, setTitle] = useState('Financial Services')
	const [text, setText] = useState('Access financial services such as borrowing loans, take a credit card, and opening a bank account.')
	const [textAnimation, setTextAnimation] = useState('enter')
	const [demoShown, setDemoShown] = useState(false)
	const [signUpFormShown, setSignUpFormShown] = useState(false)
	const [signUpFormSubmitted, setSignUpFormSubmitted] = useState(false)
	const [footerShown, setFooterShown] = useState(false)
	const [signUpFormClosed, setSignUpFormClosed] = useState(false)
	const [demoButton, setDemoButton] = useState('skip')

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
			wheelMultiplier: 0.35,
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
	
	useEffect(() => {
		// const scrollBack = (e: Event) => {
		// 	e.preventDefault();
		// 	console.log(scrollXSecond.getPrevious(), scrollYSecond.getPrevious())
		// 	if(signUpFormShown) window.scrollTo(scrollXSecond.getPrevious()!, scrollYSecond.getPrevious()!);
		// };

		// window.addEventListener('scroll', scrollBack);

		// return () => {
		// 	window.removeEventListener('scroll', scrollBack);
		// };

		if(signUpFormSubmitted) {
			const targetElement = secondTargetRef.current;
            // const specificPoint = 0.40; // 40% of the target element's height

            // // Calculate the exact scroll position within the target element
            // const elementTop = (targetElement?.getBoundingClientRect()?.top ?? 0) + window.scrollY;
            // const elementHeight = targetElement?.getBoundingClientRect().height;
            // const scrollToPosition = elementTop + ((elementHeight ?? 0) * specificPoint);

			// console.log(scrollToPosition, window.scrollY)

            // window.scrollTo({
            //     top: scrollToPosition,
            // });

			window.scrollTo({
				top: document.body.scrollHeight * 0.43,
			})
		}

	}, [signUpFormSubmitted]);

	// const translate = useTransform(scrollYProgress, [0, 0.75, 1], ['300px', '0px', '-300px'])
	// const rotate = useTransform(scrollYProgress, (pos) => {
	// 	console.log(pos)
	// 	return pos > 0.1 ? 0 : -4
	// })

	// const rotate = useTransform(scrollYProgress, [0, 0.15, 0.20, 0.15, 0.35], [-4, -2, 0, 2, 4])
	// const imageVal = useTransform(scrollYProgress, [0, 0.15, 0.20, 0.15, 2420], ['iphoneFirst.png', 'iphoneSecond.png', 'iphoneThird.png', 'iphoneSecond.png', 'iphoneSecond.png'])
	// const titleVal = useTransform(scrollYProgress, [0, 0.15, 0.20, 0.15, 0.40], ['Financial Services', 'Personalized Offers', 'Secure Access', 'Financial Guide', 'Product Comparison'])
	// const textVal = useTransform(scrollYProgress, [0, 0.15, 0.20, 0.15, 0.224, ['Access financial services such as borrowing loans, take a credit card, and opening a bank account.', 'Receive customized offers based on your credit score and enjoy pre-approved financial products for you.', 'Ensure secure login and registration through the trusted UAE PASS system, enhancing your safety.', 'Gain valuable insights into credit reports and make right financial decisions that align with your goals.', 'Easily compare various financial products to choose the ones that best suit your needs.']24
	
	// const rotateVal = useTransform(scrollYProgress, (pos) => {
	// 	if(pos <= 0.15) return -4
	// 	else if(pos <= 0.20) return -2
	// 	else if(pos <= 0.30) return 0
	// 	else if(pos <= 0.35) return 2
	// 	else if(pos <= 0.40) return 4
	// 	// if(pos <= 0.15) return -4
	// 	// else cycleRotate()
	// })

	const rotateVal = useTransform(scrollYProgress, [0.15, 0.20, 0.30, 0.35, 0.40], [-4, -2, 0, 2, 4])
	const tryText = useTransform(scrollYProgress, [0.40, 0.43], [-100, 0])
	const iphoneDemoStart = useTransform(scrollYProgress, [0.40, 0.43], [0, 20])

	const delay = useTransform(scrollYProgress, (pos) => {
		if(pos < 0.15) return 0.5
		else return 0
	})

	const duration = useTransform(scrollYProgress, (pos) => {
		if(pos < 0.15) return 0.1
		else return 1
	})

	const bgInitial = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.001) return { opacity: 0 }
		else return { opacity: 1 }
	})

	const iphoneInitial = useTransform(scrollYProgress, (pos) => {
		// console.log(pos)
		if(pos < 0.15) return { opacity: 0 }
		else return { opacity: 1 }
	})

	const imageVal = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.15) return 'iphoneFirst.png'
		else if(pos <= 0.20) return 'iphoneSecond.png'
		else if(pos <= 0.30) return 'iphoneThird.png'
		else if(pos <= 0.35) return 'iphoneFourth.png'
		else if(pos <= 0.40) return 'iphoneFifth.png'
		else return 'showDemo'
	})

	const imageDemoVal = useTransform(scrollYProgress, (pos) => {
		// if(pos <= 0.43 && signUpFormClosed) {
		// 	return 'formClosed' 
		// }
		if(pos <= 0.43 || !signUpFormSubmitted) return 'iphoneSecond.png'
		else if(pos <= 0.48) return 'demoIphoneFirst.png'
		else if(pos <= 0.53) return 'demoIphoneSecond.png'
		else if(pos <= 0.58) return 'demoIphoneThird.png'
		else if(pos <= 0.63) return 'demoIphoneFourth.png'
		else if(pos <= 0.68) return 'demoIphoneFifth.png'
		else if(pos <= 0.73) return 'demoIphoneSixth.png'
		else if(pos <= 0.78) return 'demoIphoneSeventh.png'
		else if(pos <= 0.83) return 'demoIphoneEighth.png'
		else if(pos <= 0.88) return 'demoIphoneNinth.png'
		else if(pos <= 0.93) return 'demoIphoneTenth.png'
		else if(pos <= 0.98) return 'demoIphoneEleventh.png'
		else return 'footerShown'
	})

	const titleVal = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.15) return 'Financial Services'
		else if(pos <= 0.20) return 'Personalized Offers'
		else if(pos <= 0.30) return 'Secure Access'
		else if(pos <= 0.35) return 'Financial Guide'
		else if(pos <= 0.40) return 'Product Comparison'
	})

	const textVal = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.15) return 'Access financial services such as borrowing loans, take a credit card, and opening a bank account.'
		else if(pos <= 0.20) return 'Receive customized offers based on your credit score and enjoy pre-approved financial products for you.'
		else if(pos <= 0.30) return 'Ensure secure login and registration through the trusted UAE PASS system, enhancing your safety.'
		else if(pos <= 0.35) return 'Gain valuable insights into credit reports and make right financial decisions that align with your goals.'
		else if(pos <= 0.40) return 'Easily compare various financial products to choose the ones that best suit your needs.'
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
		if(pos === 'showDemo') 
		{
			setDemoShown(true)
		}
		else 
		{
			if(demoShown) setDemoShown(false)
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
		if(pos === 'footerShown') setFooterShown(true)
		else
		{
			if(footerShown) setFooterShown(false)
			setImageDemo(pos!)
		}
	})

	useMotionValueEvent(scrollYProgress, 'change', (pos) => {
		if(pos >= 0.93) setDemoButton('restart')
		if(scrollYProgress.getPrevious()! >= 0.93 && pos <= 0.98) {
			if(signUpFormClosed) {
				window.scrollTo({
					top: document.body.scrollHeight * 0.39,
				})
				setSignUpFormClosed(false)
				setSignUpFormShown(true)
			}
			setFooterShown(false)
			setDemoShown(true)
		}
		else if(pos >= 0.98) {
			setFooterShown(true)
		}
	})

	useEffect(() => {
		if(signUpFormSubmitted) setDemoButton('skip')
	}, [signUpFormSubmitted])

	const MotionImage = motion(Image)

	return (
		<main ref={targetRef} className={cn("flex flex-col pt-6 no-scroll-bar min-h-[600vh]", !footerShown && 'px-12')}>
			<AnimatePresence mode='popLayout'>
				{!scrolled && (
					<motion.section exit={{ y: "-100vh" }} transition={{ duration: 0.5 }} key="firstHero" className='flex flex-col max-h-screen flex-1 z-30'>
						<Header />
						<section className='relative rounded-t-3xl flex flex-col pt-20 px-4 items-center gap-8 flex-1'>
							<Image
								src='/images/fourthDubaiBg.png'
								fill
								alt='Dubai'
								className='rounded-t-3xl w-full h-full object-cover absolute z-[-2]' 
							/>
							{/* <div className='z-[-1] bg-[rgba(110,37,37,0.35)] w-full h-full top-0 rounded-3xl absolute' /> */}
							<div ref={mainSection} className='flex flex-col justify-center items-center gap-2.5'>
								<h1 className='text-white font-bold text-6xl'>Your personal finance</h1>
								<h1 className='text-white font-bold text-6xl'>assistant is on the way</h1>
							</div>
							<div className='flex flex-col justify-center items-center'>
								<h4 className='text-xl font-light text-white'>Get an overview of your finances, tips to improve your score, and</h4>
								<h4 className='text-xl font-light text-white'>personalised offers. All in one place.</h4>
							</div>
							<div className='flex flex-col items-center justify-center gap-4'>
								<div className='flex items-center justify-between gap-4'>
									<input
										type='text'
										placeholder='Enter your email'
										className='rounded-[0.5rem] p-3.5 border outline-none border-white w-screen max-w-[468px] bg-[#CBBEBD] text-black placeholder:text-black text-sm' 
									/>
									<button className='py-3.5 px-8 bg-[#ff0000] text-white font-medium rounded-[0.5rem] text-sm'>
										Get Notified
									</button>
								</div>
								<p className='text-base font-light text-white'>Get notified on launch of your personal finance assistant</p>
							</div>
							<MotionImage
								src='/images/iphoneHero.png'
								alt='Phone'
								width={400}
								height={818}
								initial={{ left: 'calc(50% - 200px)' }}
								exit={{ rotate: -4, position: 'fixed', bottom: '-550px', y: 'calc(50vh - 228px)', left: 'calc(36.2% - 150px)', opacity: 0.65, width: '300px', height: '614px'}}
								transition={{ duration: 0.40, ease: 'easeInOut' }}
								className='fixed -bottom-[550px] w-[400px] h-[818px]'
								key='phone'
							/>
						</section>
					</motion.section>
				)}
				{scrolled && !demoShown && !footerShown && (
					<motion.section ref={secondTargetRef} transition={{ duration: 0 }} key="secondHero" className={cn('flex sticky top-0 max-h-screen flex-1 items-center justify-center pl-[15%] z-20')}>
						<MotionImage
							src='/images/triangleBg.svg'
							width={782}
							height={1113}
							alt='Dubai'
							className='absolute z-[-1] -left-20'
							// initial={bgInitial.get()}
							// animate={{ opacity: 1}}
							// transition={{ duration: 0, delay: 0.15 }}
							viewport={{ once: true }}
						/>
						{/* <div className='flex fixed top-0 h-full w-[calc(100vw-6rem)]'> */}
							<div className='flex flex-1 items-center justify-center'>
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
									layoutId={scrolled ? 'phone' : undefined}
								/>
							</div>
							<motion.div className='flex flex-1 flex-col gap-4 overflow-hidden'>
								<motion.p variants={{ enter: { opacity: [0, 1], y: ['300px', '0px'] }, exit: { opacity: [0, 1], y: ['0px', '-300px'] }}} animate={textAnimation} transition={{ duration: 0.3, ease: 'easeInOut', delay: delay.get() ?? 0.5 }} className='uppercase font-bold text-[#ff0000] text-sm'>{title}</motion.p>
								<motion.p variants={{ enter: { opacity: [0, 1], y: ['300px', '0px'] }, exit: { opacity: [0, 1], y: ['0px', '-300px'] }}} animate={textAnimation} transition={{ duration: 0.3, ease: 'easeInOut', delay: delay.get() ?? 0.5 }} className='font-semibold max-w-[380px] text-[32px] leading-[2.75rem]'>{text}</motion.p>
							</motion.div>
						{/* </div> */}
					</motion.section>
				)}
				{demoShown && !footerShown && (
					<motion.section initial={{ y: '100vh' }} animate={{ y: '0' }} transition={{ duration: 0.75 }} exit={footerShown ? { y: '-100vh' } : {}} key='demo' className='flex sticky top-0 min-h-screen flex-col items-center justify-center gap-4 z-10'>
						<div className='relative flex flex-col items-center justify-center gap-4 bg-[#F1E8E6] w-full pt-20 pb-16 rounded-3xl overflow-hidden'>
							<MotionImage
								src='/images/demoTriangle.png'
								width={782}
								height={1113}
								alt='Dubai'
								className='absolute z-[11] bottom-0'
								initial={bgInitial.get()}
								animate={{ opacity: 1}}
								transition={{ duration: 0, delay: 0.15 }}
								viewport={{ once: true }}
							/>
							<div className='max-h-fit overflow-hidden'>
								<motion.p style={{ y: tryText }} className='font-semibold text-3xl'>
									Let's try a free demo
								</motion.p>
							</div>
							<MotionImage
								src={`/images/${imageDemo}`}
								alt='Phone'
								width={300}
								height={614}
								className='max-h-[614px] max-w-[300px] z-[12]'
								key='phone'
								layoutId='phone'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								style={{ y: iphoneDemoStart }}
								transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
							/>
							{demoButton === 'skip' ? (
								<p onMouseDown={() => window.scrollTo({ top: document.body.scrollHeight })} className='underline cursor-pointer absolute bottom-10 right-10 font-semibold'>Skip Demo</p>
							) : (
								<button 
									onMouseDown={() => {
										setDemoButton('skip')
										window.scrollTo({
											top: document.body.scrollHeight * 0.40,
										})
									}}
									className='absolute bottom-10 right-10 rounded-full text-base font-semibold px-6 py-3 border border-black'
								>
									Restart (R)
								</button>
							)}
						</div>
					</motion.section>
				)}
				{footerShown && (
					<motion.section key="footer" initial={{ y: '100vh' }} animate={{ y: '0' }} transition={{ duration: 0.75 }} exit={{ y: '100vh' }} className='flex gradient-footer sticky top-0 min-h-screen flex-col items-center justify-end z-20'>
						<section className='flex flex-col items-center justify-end gap-8 flex-1'>
							<Image
								src="/images/logo.svg"
								alt="Loanee"
								width={195}
								height={50}
							/>
							<div ref={mainSection} className='flex flex-col justify-center items-center gap-2.5'>
								<h1 className='text-black font-bold text-6xl'>Your personal finance</h1>
								<h1 className='text-black font-bold text-6xl'>assistant is coming soon</h1>
								<h4	className='text-xl font-light text-black mt-2'>Get notified and stay tuned!</h4>
							</div>
							<div className='flex items-center justify-center mt-4 gap-4'>
								<Image
									src='/images/appstore.png'
									width={120} 
									height={40}
									alt='App Store' 
								/>
								<Image
									src='/images/playstore.png'
									width={120} 
									height={40}
									alt='App Store' 
								/>
							</div>
							<Image
								src='/images/footerphones.png'
								width={533}
								height={410}
								alt='Footer Phones' 
							/>
						</section>
						<div className='py-6 px-20 gap-8 items-center justify-between bg-[#F7F4F6] flex w-full'>
							<div className='gap-10 flex'>
								<p className='text-sm cursor-pointer'>Terms</p>
								<p className='text-sm cursor-pointer'>Privacy</p>
								<p className='text-sm cursor-pointer'>Cookie policy</p>
							</div>
							<div className='gap-10 flex'>
								<Image
									src='/images/twitter.png'
									width={18}
									height={18}
									alt='Twitter'
									className='cursor-pointer'
								/>
								<Image
									src='/images/instagram.png'
									width={18}
									height={18}
									alt='Instagram'
									className='cursor-pointer'
								/>
								<Image
									src='/images/facebook.png'
									width={18}
									height={18}
									alt='Facebook'
									className='cursor-pointer'
								/>
								<Image
									src='/images/linkedin.png'
									width={18}
									height={18}
									alt='Linkedin'
									className='cursor-pointer'
								/>
							</div>
						</div>
					</motion.section>
				)}
			</AnimatePresence>
			{signUpFormShown && (
				<Dialog open={signUpFormShown}>
					<DialogContent className='bg-[#F7F3F6] flex flex-col gap-10 py-10 px-6 z-50 md:min-w-[720px]'>
						<DialogHeader className='font-bold text-lg'>
							Please fill out this form for free demo
						</DialogHeader>
						<div className='flex flex-col gap-6'>
							<div className='flex max-md:flex-col gap-6'>
								<input
									className='rounded-xl bg-white outline-none px-4 py-3.5 w-screen max-w-[458px]'
									type='text'
									placeholder='First Name' 
								/>
								<input
									className='rounded-xl bg-white outline-none px-4 py-3.5 w-screen max-w-[458px]'
									type='text'
									placeholder='Job title' 
								/>
							</div>
							<div className='flex max-md:flex-col gap-6'>
								<input
									className='rounded-xl bg-white outline-none px-4 py-3.5 w-screen max-w-[458px]'
									type='text'
									placeholder='Email id' 
								/>
								<input
									className='rounded-xl bg-white outline-none px-4 py-3.5 w-screen max-w-[458px]'
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
						<div 
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
						</div>
					</DialogContent>
				</Dialog>
			)}
		</main>
	)
}
