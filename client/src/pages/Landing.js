import main from '../assets/images/main-alternative.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import {Logo} from '../components/index';

const Landing = () => {
    return(
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                        I'm baby thundercats selfies pug portland, raw denim poutine air plant literally. Biodiesel knausgaard hoodie, leggings brunch sriracha flannel direct trade neutra vape try-hard cloud bread truffaut prism. Listicle DIY ethical godard artisan neutra taiyaki intelligentsia man braid dreamcatcher. Same fashion axe cold-pressed direct trade.
                    </p>
                    <button className='btn btn-hero'>Login/Register</button>
                </div>
                {/* Use https://undraw.co to get illustrations */}
                <img src={main} alt='job-hunt' className='img main-img' />
            </div>
        </Wrapper>
    )
}

export default Landing;