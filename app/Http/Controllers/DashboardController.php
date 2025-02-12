<?php

namespace App\Http\Controllers;

use App\Models\post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;



class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $posts = post::with('utilisateur')->get();
        return inertia('Dashboard', [
            'posts' => $posts,
            'user' => $user]);
    }

    public function logout(Request $request)
    {
        // Logout the user
        Auth::logout();

        // Invalidate the session and regenerate the CSRF token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect to the login page using Inertia.js (This will trigger a full page update in the frontend)
        return Inertia::location(route('login'));
    }


}
