// ES Modules syntax
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const categories = [
    'AI & Machine Learning',
    'Software Development',
    'Gadgets & Electronics',
    'Tech News & Trends',
    'General Science',
    'Space & Astronomy',
    'Psychology & Cognitive Science',
    'Education & Learning Strategies',
    'Travel & Adventure',
    'Food & Cooking'
];


const seedCategories = async () => {
    try {
        await db.category.createMany({
            data: categories.map(category => ({
                name: category
            })),
        });
        console.log('Categories seeded');
    } catch (error) {
        console.error('Error seeding categories:', error);
    } finally {
        await db.$disconnect();
    }
};

seedCategories();
