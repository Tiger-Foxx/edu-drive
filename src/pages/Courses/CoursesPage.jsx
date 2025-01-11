// src/pages/Courses/CoursesPage.jsx
import { useState } from 'react';
import { Search, Clock, Users, ChevronRight } from 'lucide-react';
import './CoursesPage.css';

const CoursesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const courses = [
        {
            id: 1,
            title: "Marketing Digital Avancé",
            description: "Maîtrisez les stratégies modernes du marketing digital pour développer votre présence en ligne et atteindre vos objectifs commerciaux.",
            category: "marketing",
            duration: "12 heures",
            students: 234,
            thumbnail: "course1.jpg"
        },
        {
            id: 2,
            title: "Développement Personnel",
            description: "Découvrez les techniques essentielles pour atteindre vos objectifs personnels et professionnels et devenir la meilleure version de vous-même.",
            category: "development",
            duration: "8 heures",
            students: 156,
            thumbnail: "course1.jpg"
        },
        {
            id: 3,
            title: "Business & Entrepreneuriat",
            description: "Apprenez à créer et développer votre entreprise avec des stratégies éprouvées et des cas pratiques inspirants.",
            category: "business",
            duration: "15 heures",
            students: 189,
            thumbnail: "course1.jpg"
        },
        {
            id: 4,
            title: "Marketing Digital Avancé",
            description: "Maîtrisez les stratégies modernes du marketing digital pour développer votre présence en ligne et atteindre vos objectifs commerciaux.",
            category: "marketing",
            duration: "12 heures",
            students: 234,
            thumbnail: "course1.jpg"
        }
    ];

    const categories = [
        { id: 'all', name: 'Toutes les formations' },
        { id: 'marketing', name: 'Marketing' },
        { id: 'development', name: 'Développement Personnel' },
        { id: 'business', name: 'Business' },
        { id: 'sales', name: 'Ventes' },
        { id: 'tech', name: 'Technologie' }
    ];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="courses-container">
            <div className="page-header">
                <h1 className="page-title">Formations Exclusives</h1>
                <p className="page-subtitle">
                    Développez vos compétences avec nos formations premium soigneusement sélectionnées
                </p>
            </div>

            <div className="search-section">
                <div className="search-bar">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Rechercher une formation..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="categories">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="courses-grid">
                {filteredCourses.map((course) => (
                    <div key={course.id} className="course-card">
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="course-thumbnail"
                        />
                        <div className="course-content">
                            <h3 className="course-title">{course.title}</h3>
                            <p className="course-description">{course.description}</p>

                            <div className="course-meta">
                                <div className="meta-item">
                                    <Clock size={16} />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="meta-item">
                                    <Users size={16} />
                                    <span>{course.students} étudiants</span>
                                </div>
                            </div>

                            <button className="access-btn">
                                Accéder au cours
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;