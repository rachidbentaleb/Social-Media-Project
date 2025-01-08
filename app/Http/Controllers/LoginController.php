<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log; 
use Inertia\Inertia;// Add this line

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render('Login'); // Ensure this matches the component name
    }



public function login(Request $req){
    // Validate the incoming request
    $req->validate([
        'email' => 'required|email|max:255',
        'mdp' => 'required|min:8', 
    ]);

    // Attempt to find the user by email
    $user = Utilisateur::where('email', $req->email)->first();

    // Check if user exists and if password is correct
    if ($user && Hash::check($req->mdp, $user->mdp)) {
        // Log the user in
        Auth::login($user);
        $req->session()->regenerate();

        // Redirect to the dashboard
        return redirect()->route('dashboard')->with('success', 'Login successful.');
    }

    // If authentication fails, log the error and return an error message
    Log::error('Invalid credentials for user: ' . $req->email);
    return back()->withErrors(['email' => 'Invalid credentials provided.'])->onlyInput('email');
}

    
    
}
