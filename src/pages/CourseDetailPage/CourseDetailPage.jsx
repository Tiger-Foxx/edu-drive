import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Lock, PlayCircle, FileText, ChevronRight, ExternalLink, BookOpen, Clock, Award, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CourseDetailPage.css';
import { checkUserPaid } from "@/services/userService.jsx";
import { formationService } from '@/services/formationService';

const CourseDetailPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notions, setNotions] = useState([]);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                setLoading(true);
                const data = await formationService.getFormationById(id);
                setCourse(data);

                // Traitement des notions
                if (data.notions) {
                    if (data.notions.includes(';')) {
                        setNotions(data.notions.split(';').map(notion => notion.trim()));
                    } else {
                        setNotions([data.notions]); // Si c'est un texte simple
                    }
                }
            } catch (err) {
                setError('Impossible de charger les détails de la formation');
                console.error('Error fetching course:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCourseDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
                    <div className="text-center">
                        <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <ExternalLink className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h2>
                        <p className="text-gray-600">{error}</p>
                        <Link
                            to="/courses"
                            className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                        >
                            Retour aux formations
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!course) return null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
            <div className="w-full bg-gradient-to-br from-blue-900 to-blue-600 py-12">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="grid lg:grid-cols-5 gap-8 items-start">
                        <div className="lg:col-span-3">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                                <div className="aspect-w-16 aspect-h-9">
                                    {course.presentation_video ? (
                                        <video
                                            className="w-full h-full object-cover"
                                            controls
                                            poster={course.thumbnail}
                                        >
                                            <source src={course.presentation_video} type="video/mp4" />
                                            Votre navigateur ne supporte pas la lecture vidéo.
                                        </video>
                                    ) : course.presentation_video_link ? (
                                        <iframe
                                            id='youtube-video'
                                            className="w-full h-full"
                                            src={course.presentation_video_link.replace('watch?v=', 'embed/')}
                                            title="Video de présentation"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100">
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {course.title}
                                </h1>
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700">
                                        <Clock className="w-4 h-4 mr-2" />
                                        {course.duration}h de formation
                                    </span>
                                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700">
                                        <Users className="w-4 h-4 mr-2" />
                                        {course.participants_number} apprenants
                                    </span>
                                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700">
                                        <Star className="w-4 h-4 mr-2" />
                                        {course.notation} / 5
                                    </span>
                                </div>

                                {checkUserPaid() ? (
                                    <a
                                        href={course.drive_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700
                                        text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300
                                        hover:shadow-lg mb-6 text-center"
                                    >
                                        <ExternalLink className="w-5 h-5 mr-2" />
                                        Accéder à la formation complète
                                    </a>
                                ) : (
                                    <Link
                                        to="/signup"
                                        className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700
                                        text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300
                                        hover:shadow-lg mb-6 text-center"
                                    >
                                        S'inscrire maintenant pour y accéder
                                    </Link>
                                )}

                                {notions.length > 0 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Ce que vous apprendrez
                                        </h2>
                                        <ul className="space-y-3">
                                            {notions.map((notion, index) => (
                                                <li key={index} className="flex items-start">
                                                    <ChevronRight className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700">{notion}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                                Description de la formation
                            </h2>
                            <div className="prose prose-lg max-w-none text-gray-700">
                                <p>{course.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold mb-4 text-gray-900">
                                    Ce qui est inclus
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        { icon: PlayCircle, text: 'Vidéos HD' },
                                        { icon: FileText, text: 'Resources téléchargeables' },
                                        { icon: ExternalLink, text: 'Accès à vie' },
                                        { icon: Award, text: `${course.points} points à gagner` }
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <item.icon className="w-5 h-5 text-blue-600 mr-3" />
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-xl">
                                <h3 className="text-xl font-bold mb-3">
                                    Commencez maintenant
                                </h3>
                                {!checkUserPaid() ? (
                                    <>
                                        <p className="mb-4 opacity-90">
                                            Inscrivez-vous pour accéder à cette formation et à tout notre catalogue
                                        </p>
                                        <Link
                                            to="/signup"
                                            className="w-full inline-flex items-center justify-center bg-white text-blue-600
                                            font-semibold px-6 py-3 rounded-xl transition-all duration-300
                                            hover:shadow-lg hover:bg-blue-50"
                                        >
                                            S'inscrire
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <p className="mb-4 opacity-90">
                                            Vous êtes inscrit ! Accédez à votre formation maintenant !
                                        </p>
                                        <a
                                            href={course.drive_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full inline-flex items-center justify-center bg-white text-blue-600
                                            font-semibold px-6 py-3 rounded-xl transition-all duration-300
                                            hover:shadow-lg hover:bg-blue-50"
                                        >
                                            Commencer
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;