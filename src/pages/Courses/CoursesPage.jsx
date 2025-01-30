import React, { useState, useEffect } from 'react';
import { Search, Clock, Users, ChevronRight } from 'lucide-react';
import { formationService } from '@/services/formationService.jsx';
import { useNavigate } from 'react-router-dom';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const navigate = useNavigate();

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const data = await formationService.getPopularFormations();
                setCourses(data);
            } catch (err) {
                setError('Erreur lors du chargement des formations');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const categories = [
        { id: 'all', name: 'Toutes les formations' },
        { id: 'marketing', name: 'Marketing' },
        { id: 'development', name: 'Développement Personnel' },
        { id: 'business', name: 'Business' },
        { id: 'sales', name: 'Ventes' },
        { id: 'tech', name: 'Technologie' },
        { id: 'other', name: 'Autres' }
    ];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (course.description || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || course.category  === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <div className="bg-red-100 text-red-600 rounded-lg shadow-md p-6 max-w-md">
                    <span className="text-xl font-semibold">❌ Erreur</span>
                    <p className="mt-2 text-center">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mt-16 mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
                        Formations Exclusives
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Développez vos compétences avec nos formations premium soigneusement sélectionnées
                    </p>
                </div>

                <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg p-6 md:p-8 mb-12">
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
                            placeholder="Rechercher une formation..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                                    selectedCategory === category.id
                                        ? 'bg-blue-600 text-white transform -translate-y-0.5 shadow-lg shadow-blue-600/20'
                                        : 'bg-white text-slate-700 border-2 border-transparent hover:border-blue-600 hover:text-blue-600'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-48 object-cover border-b-4 border-blue-600"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-800 mb-4">
                                    {course.title}
                                </h3>
                                <p className="text-slate-600 mb-6 line-clamp-3">
                                    {course.description}
                                </p>

                                <div className="flex justify-between items-center py-4 border-t border-slate-200 mb-6">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Clock size={16} />
                                        <span>{course.duration || 6} heures</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Users size={16} />
                                        <span>{course.participants_number} étudiants</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate(`/courses-detail/${course.id}`)}
                                    className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/20"
                                >
                                    Accéder au cours
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;