import Header from './Header';
import { getMenu } from '@/lib/wordpress';

export default async function DynamicHeader({ variant }) {
    const menuItems = await getMenu('header', 0); // Disable cache for the menu to sync sequence
    return <Header variant={variant} menuItems={menuItems} />;
}
