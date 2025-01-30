// src/components/coursesSection/CoursesSection.jsx
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Users, Clock, Send } from 'lucide-react';
import './CoursesSection.css';
import {useNavigate} from "react-router-dom";
import {checkUserPaid} from "@/services/userService.jsx";
import {formationService} from "@/services/formationService.js";

const CoursesSection = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);
    const slideRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const data = await formationService.getPopularFormations(5);
                setCourses(data);
                console.log("Cours : ",data);
            } catch (err) {
                setError('Erreur lors du chargement des formations');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);








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

    if (loading)
        return (
            <div className="mb-10 flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );

    if (error)
        return (
            <div className="mb-10 flex flex-col items-center justify-center p-6 bg-red-100 text-red-600 rounded-lg shadow-md max-w-md mx-auto">
                <span className="text-xl font-semibold">❌ Erreur</span>
                <p className="mt-2 text-center">{error}</p>
            </div>
        );

    if (courses.length === 0)
        return (
            <div className="mb-10 flex flex-col items-center justify-center p-6 bg-blue-50 text-blue-700 rounded-lg shadow-md max-w-md mx-auto">
                <span className="text-2xl font-semibold">📚 Oups !</span>
                <p className="mt-2 text-center">
                    Aucune formation disponible pour le moment. Revenez bientôt ! 🚀
                </p>
            </div>
        );

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
                    <div className="carousel-track" ref={slideRef}>
                        {courses.map((course, index) => (
                            <div key={course.id} className="course-card">
                                <div className="card-image-container">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="card-image"
                                    />
                                </div>
                                <div className="card-content">
                                    <h3 className="course-title">{course.title}</h3>
                                    <p className="course-description">{course.description}</p>
                                    <div className="course-stats">
                                        <div className="stat">
                                            <Star className="w-4 h-4 text-yellow-400"/>
                                            <span>{course.notation}</span>
                                        </div>
                                        <div className="stat">
                                            <Users className="w-4 h-4 text-blue-500"/>
                                            <span>{course.participants_number}</span>
                                        </div>
                                        <div className="stat">
                                            <Clock className="w-4 h-4 text-green-500"/>
                                            <span>{`${course.duration}h`}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="enroll-button"
                                    onClick={() => navigate(`/courses-detail/${course.id}`)}
                                >
                                    S&#39;inscrire maintenant
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