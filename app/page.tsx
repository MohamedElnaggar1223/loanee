'use client'
import Header from "@/components/Header";
import { AnimatePresence, MotionValue, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const rotations = [-4, -2, 0, 2, 4]
//rotations[rotations.indexOf(rotate.get()) > 0 ? rotations.indexOf(rotate.get()) + 1 : rotations.indexOf(rotate.get())]
export default function Home() {
	const [scrolled, setScrolled] = useState(false)
	const [rotate, setRotate] = useState(-4)
	const [rotatePrev, setRotatePrev] = useState(-4)
	const [image, setImage] = useState('iphoneThird.png')
	const [title, setTitle] = useState('Financial Services')
	const [text, setText] = useState('Access financial services such as borrowing loans, take a credit card, and opening a bank account.')
	const [textAnimation, setTextAnimation] = useState('enter')
	const targetRef = useRef<HTMLDivElement>(null)
	const secondTargetRef = useRef<HTMLDivElement>(null)

	const { scrollY } = useScroll({
		target: targetRef,
		offset: ['start start', 'end start']
    })

	const { scrollYProgress } = useScroll({
		target: secondTargetRef,
		offset: ['start start', 'end start']
    })

	// const translate = useTransform(scrollYProgress, [0, 0.75, 1], ['300px', '0px', '-300px'])
	// const rotate = useTransform(scrollYProgress, (pos) => {
	// 	console.log(pos)
	// 	return pos > 0.1 ? 0 : -4
	// })

	// const rotate = useTransform(scrollYProgress, [0, 0.04, 0.06, 0.08, 0.10], [-4, -2, 0, 2, 4])
	// const imageVal = useTransform(scrollYProgress, [0, 0.04, 0.06, 0.08, 0.10], ['iphoneFirst.png', 'iphoneSecond.png', 'iphoneThird.png', 'iphoneSecond.png', 'iphoneSecond.png'])
	// const titleVal = useTransform(scrollYProgress, [0, 0.04, 0.06, 0.08, 0.10], ['Financial Services', 'Personalized Offers', 'Secure Access', 'Financial Guide', 'Product Comparison'])
	// const textVal = useTransform(scrollYProgress, [0, 0.04, 0.06, 0.08, 0.10], ['Access financial services such as borrowing loans, take a credit card, and opening a bank account.', 'Receive customized offers based on your credit score and enjoy pre-approved financial products for you.', 'Ensure secure login and registration through the trusted UAE PASS system, enhancing your safety.', 'Gain valuable insights into credit reports and make right financial decisions that align with your goals.', 'Easily compare various financial products to choose the ones that best suit your needs.'])

	const rotateVal = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.04) return -4
		else if(pos <= 0.06) return -2
		else if(pos <= 0.08) return 0
		else if(pos <= 0.10) return 2
		else if(pos <= 0.12) return 4
	})

	const delay = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.0005) return 0.5
		else return 0
	})

	const duration = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.0005) return 0.1
		else return 1
	})

	const bgInitial = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.0005) return { opacity: 0 }
		else return { opacity: 1 }
	})

	const iphoneInitial = useTransform(scrollYProgress, (pos) => {
		console.log(pos)
		if(pos <= 0.0005) return { rotate: -4, opacity: 0 }
		else return { opacity: 1, filter: 'blur(2px)', rotate: rotatePrev}
	})

	const imageVal = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.04) return 'iphoneFirst.png'
		else if(pos <= 0.06) return 'iphoneSecond.png'
		else if(pos <= 0.08) return 'iphoneThird.png'
		else if(pos <= 0.10) return 'iphoneSecond.png'
		else if(pos <= 0.12) return 'iphoneThird.png'
	})

	const titleVal = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.04) return 'Financial Services'
		else if(pos <= 0.06) return 'Personalized Offers'
		else if(pos <= 0.08) return 'Secure Access'
		else if(pos <= 0.10) return 'Financial Guide'
		else if(pos <= 0.12) return 'Product Comparison'
	})

	const textVal = useTransform(scrollYProgress, (pos) => {
		if(pos <= 0.04) return 'Access financial services such as borrowing loans, take a credit card, and opening a bank account.'
		else if(pos <= 0.06) return 'Receive customized offers based on your credit score and enjoy pre-approved financial products for you.'
		else if(pos <= 0.08) return 'Ensure secure login and registration through the trusted UAE PASS system, enhancing your safety.'
		else if(pos <= 0.10) return 'Gain valuable insights into credit reports and make right financial decisions that align with your goals.'
		else if(pos <= 0.12) return 'Easily compare various financial products to choose the ones that best suit your needs.'
	})

	useMotionValueEvent(scrollY, 'change', (pos) => {
        if (pos > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

	useMotionValueEvent(imageVal, 'change', (pos) => {
		setImage(pos!)
		setTextAnimation('exit')
		setTimeout(() => {
			setTextAnimation('enter')
		}, 150)
	})

	useMotionValueEvent(titleVal, 'change', (pos) => {
		setTitle(pos!)
	})

	useMotionValueEvent(textVal, 'change', (pos) => {
		setText(pos!)
	})

	useMotionValueEvent(rotateVal, 'change', (pos) => {
		setRotate(pos!)
		setRotatePrev(rotateVal.getPrevious()!)
	})

	const MotionImage = motion(Image)

	return (
		<main ref={targetRef} className="flex min-h-[300vh] flex-col px-12 pt-6 no-scroll-bar">
			<AnimatePresence mode='popLayout'>
				{!scrolled && (
					<motion.section exit={{ y: "-100vh" }} transition={{ duration: 0.5 }} key="firstHero" className='flex flex-col max-h-screen flex-1'>
						<Header />
						<section className='relative rounded-t-3xl flex flex-col pt-20 px-4 items-center gap-8 flex-1'>
							<Image
								src='/images/dubaiBg.png'
								fill
								alt='Dubai'
								className='rounded-t-3xl w-full h-full object-cover absolute z-[-1]' 
							/>
							<div className='flex flex-col justify-center items-center gap-2.5'>
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
										className='rounded-lg p-3.5 border outline-none border-white w-screen max-w-[468px] bg-[#CBBEBD] text-black placeholder:text-black text-sm' 
									/>
									<button className='py-3.5 px-8 bg-[#ff0000] text-white font-medium rounded-lg text-sm'>
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
								exit={{ rotate: -4, position: 'fixed', bottom: '-550px', y: 'calc(50vh - 235px)', left: 'calc(25% - 150px)', opacity: 0.65, width: '300px', height: '614px'}}
								transition={{ duration: 0.55, ease: 'easeInOut' }}
								className='fixed -bottom-[550px] w-[400px] h-[818px]'
								key='phone'
							/>
						</section>
					</motion.section>
				)}
				{scrolled && (
					<motion.section ref={secondTargetRef} transition={{ duration: 0 }} key="secondHero" className='flex sticky top-0 max-h-screen flex-1 items-center justify-center'>
						<MotionImage
							src='/images/triangleBg.svg'
							width={782}
							height={1113}
							alt='Dubai'
							className='absolute z-[-1] -left-20'
							initial={bgInitial.get()}
							animate={{ opacity: 1}}
							transition={{ duration: 0, delay: 0.08 }}
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
									animate={{ opacity: 1, filter: 'blur(0px)', rotate: rotate }}
									// //@ts-expect-error rotate
									// style={{ rotate }}
									transition={{ duration: duration.get(), ease: 'easeInOut', delay: delay.get() ?? 0.5 }}
									className='max-h-[614px] max-w-[300px]'
									key='phone'
									viewport={{ once: true }}
									priority
								/>
							</div>
							<motion.div className='flex flex-1 flex-col gap-4 overflow-hidden'>
								<motion.p variants={{ enter: { opacity: [0, 1], y: ['300px', '0px'] }, exit: { opacity: [0, 1], y: ['0px', '-300px'] }}} animate={textAnimation} transition={{ duration: 0.3, ease: 'easeInOut', delay: delay.get() ?? 0.5 }} className='uppercase font-bold text-[#ff0000] text-sm'>{title}</motion.p>
								<motion.p variants={{ enter: { opacity: [0, 1], y: ['300px', '0px'] }, exit: { opacity: [0, 1], y: ['0px', '-300px'] }}} animate={textAnimation} transition={{ duration: 0.3, ease: 'easeInOut', delay: delay.get() ?? 0.5 }} className='font-semibold max-w-[380px] text-4xl'>{text}</motion.p>
							</motion.div>
						{/* </div> */}
					</motion.section>
				)}
			</AnimatePresence>
		</main>
	)
}
