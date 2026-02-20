import Header from './Header';
import { getMenu } from '@/lib/wordpress';

export default async function DynamicHeader({ variant }) {
    const menuItems = await getMenu('header', 60); // Use standard revalidation instead of 0 to fix build errors
    return <Header variant={variant} menuItems={menuItems} />;
}
