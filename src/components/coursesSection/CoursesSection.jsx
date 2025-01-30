// src/components/coursesSection/CoursesSection.jsx
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Users, Clock, Send } from 'lucide-react';
import './CoursesSection.css';
import {useNavigate} from "react-router-dom";
import {checkUserPaid} from "@/services/userService.jsx";

const CoursesSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3); // Par défaut, 3 cartes visibles
    const slideRef = useRef(null);




    const courses = [
        {
            title: "Marketing Digital Avancé",
            description: "Maîtrisez les stratégies marketing modernes et développez votre présence en ligne",
            rating: 4.8,
            students: 1234,
            duration: "12h",
            image: "course1.jpg",
            category: "Marketing"
        },
        {
            title: "Développement Web Full-Stack",
            description: "De débutant à expert : Apprenez le développement web moderne de A à Z",
            rating: 4.9,
            students: 2156,
            duration: "30h",
            image: "course1.jpg",
            category: "Programmation"
        },
        {
            title: "Finance & Investissement",
            description: "Comprendre les marchés financiers et les stratégies d'investissement",
            rating: 4.7,
            students: 987,
            duration: "15h",
            image: "course1.jpg",
            category: "Finance"
        },
        {
            title: "Design UI/UX Professionnel",
            description: "Créez des interfaces utilisateur modernes et intuitives",
            rating: 4.9,
            students: 1567,
            duration: "20h",
            image: "course1.jpg",
            category: "Design"
        },
        {
            title: "Intelligence Artificielle & ML",
            description: "Plongez dans le monde de l'IA et du Machine Learning",
            rating: 4.8,
            students: 1890,
            duration: "25h",
            image: "course1.jpg",
            category: "Tech"
        }
    ];

    // const nextSlide = () => {
    //     setCurrentSlide((prev) =>
    //         prev === courses.length - 3 ? 0 : prev + 1
    //     );
    // };
    //
    // const prevSlide = () => {
    //     setCurrentSlide((prev) =>
    //         prev === 0 ? courses.length - 3 : prev - 1
    //     );
    // };

    // Mise à jour du nombre de cartes visibles selon la taille de l'écran
    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth <= 640) {
                setSlidesToShow(1); // Une seule carte sur mobile
            } else if (window.innerWidth <= 1024) {
                setSlidesToShow(2); // Deux cartes sur tablette
            } else {
                setSlidesToShow(3); // Trois cartes sur desktop
            }
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);

        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === courses.length - slidesToShow ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? courses.length - slidesToShow : prev - 1
        );
    };

    useEffect(() => {
        const slideElement = slideRef.current;
        if (slideElement) {
            // Calcul de translation dynamique
            const translatePercentage = 100 / slidesToShow+3;
            slideElement.style.transform = `translateX(-${currentSlide * translatePercentage}%)`;
        }
    }, [currentSlide, slidesToShow]);
    const navigate = useNavigate();
    return (
        <section className="courses-section">
            <div className="courses-container">
                <div className="section-header">
                    <h2 className="section-title">
                        Formations les plus
                        <span className="text-gradient"> populaires</span>
                    </h2>
                    <p className="section-description">
                        Découvrez nos formations les plus appréciées et commencez votre parcours vers le succès
                    </p>
                    <div className="carousel-controls">
                        <button
                            onClick={prevSlide}
                            className="control-button"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6"/>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="control-button"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6"/>
                        </button>
                    </div>
                </div>

                <div className="carousel-container">
                    <div
                        className="carousel-track"
                        ref={slideRef}
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            transition: 'transform 0.5s ease',
                        }}
                    >
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className="course-card"
                                style={{
                                    flex: `0 0 ${100 / slidesToShow}%`, // Largeur dynamique selon slidesToShow
                                }}
                            >
                                <div className="card-image-container">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="card-image"
                                    />
                                    <span className="category-badge">{course.category}</span>
                                </div>
                                <div className="card-content">
                                    <h3 className="course-title">{course.title}</h3>
                                    <p className="course-description">{course.description}</p>
                                    <div className="course-stats">
                                        <div className="stat">
                                            <Star className="w-4 h-4 text-yellow-400"/>
                                            <span>{course.rating}</span>
                                        </div>
                                        <div className="stat">
                                            <Users className="w-4 h-4 text-blue-500"/>
                                            <span>{course.students}</span>
                                        </div>
                                        <div className="stat">
                                            <Clock className="w-4 h-4 text-green-500"/>
                                            <span>{course.duration}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="enroll-button"  >
                                    <a href='/courses-detail'>
                                        S&#39;inscrire maintenant
                                    </a>

                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {checkUserPaid() && <div className="telegram-section">
                <div className="telegram-container">
                    <div className="telegram-content">
                        <div className="telegram-text">
                            <h2 className="telegram-title">
                                Rejoignez notre communauté
                                <span className="text-gradient"> Telegram</span>
                            </h2>
                            <p className="telegram-description">
                                Accédez à du contenu exclusif, des conseils d&#39;experts et connectez-vous
                                avec d&#39;autres apprenants passionnés.
                            </p>
                            <div className="telegram-features">
                                <div className="feature">
                                    <div className="feature-icon">🎯</div>
                                    <span>Contenu exclusif</span>
                                </div>
                                <div className="feature">
                                    <div className="feature-icon">💡</div>
                                    <span>Conseils d&#39;experts</span>
                                </div>
                                <div className="feature">
                                    <div className="feature-icon">🤝</div>
                                    <span>Networking</span>
                                </div>
                            </div>
                            <button className="telegram-button">
                                <Send className="w-5 h-5"/>
                                Rejoindre pour 10 000 XAF
                            </button>
                        </div>
                        <div className="telegram-image">
                            <img
                                src="telegram.jpg"
                                alt="Telegram Community"
                                className="community-image"
                            />
                            <div className="floating-card members-card">
                                <div className="members-content">
                                    <div className="members-icon">👥</div>
                                    <div className="members-text">
                                        <span className="members-count">5,000+</span>
                                        <span className="members-label">Membres actifs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        
        </section>
)
    ;
};

export default CoursesSection;