import { getMenu, getSiteContent } from '@/lib/wordpress';
import Footer from './Footer';

export default async function DynamicFooter() {
    const [menuItems, footerContent] = await Promise.all([
        getMenu('footer'),
        getSiteContent('footer-content')
    ]);

    return <Footer menuItems={menuItems} content={footerContent} />;
}
