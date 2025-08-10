import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './Auth_Provider';

export function DashboardRedirector() {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            navigate("/login", { replace: true });
            return;
        }

        // Prevent redundant redirects
        if (location.pathname !== "/dashboard") return;

        switch (user.role) {
            case 'admin':
                navigate('/dashboard/admin', { replace: true });
                return;
            case 'user':
                navigate('/dashboard/user', { replace: true });
                return;
            default:
                navigate('/login', { replace: true });
                return;
        }
    }, [user, isLoading, navigate, location.pathname]);

    return null; // optional: you can return a loader here if you want
}
