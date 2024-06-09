import Image from "next/image";

const demoImagesRotation = [
	'iphoneSecond.png',
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

const FeatureImages = [
    'iphoneHero.png',
    'iphoneFirst.png',
    'iphoneSecond.png',
    'iphoneThird.png',
    'iphoneFourth.png',
    'iphoneFifth.png',
]

export default function PreloadImages() 
{
    return (
        <div className='hidden'>
            {demoImagesRotation.map((image, index) => (
                <Image
                    key={index}
                    src={`/images/${image}`}
                    alt="Loanee"
                    width={300}
                    height={624}
                />
            ))}
            {FeatureImages.map((image, index) => (
                <Image
                    key={index}
                    src={`/images/${image}`}
                    alt="Loanee"
                    width={300}
                    height={624}
                />
            ))}
        </div>
    )
}