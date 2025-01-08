<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use App\Http\Requests\StoreUtilisateurRequest;
use App\Http\Requests\UpdateUtilisateurRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log; // Add this line

class UtilisateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Home');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('utilisateurs/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){

        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs',
            'mdp' => 'required|string|confirmed|min:8',
            'bio' => 'nullable|string',
            'photodeprofile' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);


        $imagePath = null;
        if ($request->hasFile('photodeprofile')) {
            $file = $request->file('photodeprofile');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/posts'), $filename); 
            $imagePath = 'uploads/posts/' . $filename; 
        }

        Utilisateur::create([
            'nom' => $validatedData['nom'],
            'prenom' => $validatedData['prenom'],
            'email' => $validatedData['email'],
            'mdp' => Hash::make($validatedData['mdp']),
            'bio' => $validatedData['bio'],
            'photodeprofile' => $imagePath,
        ]);



        return redirect('/')->with('success', 'Utilisateur créé avec succès');

    }


    /**
     * Display the specified resource.
     */
    public function show(Utilisateur $utilisateur)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Utilisateur $utilisateur)
    {
        sleep(1);
        return inertia('utilisateurs/Edit', [
            'utilisateur' => $utilisateur,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Utilisateur $utilisateur)
    {


        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs,email,' . $utilisateur->id,
            'mdp' => 'nullable|string|confirmed|min:8',
            'bio' => 'nullable|string',
            'photodeprofile' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        $request->validate([
            'photodeprofile' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);


        if ($request->hasFile('photodeprofile') && $request->file('photodeprofile')->isValid()) {
            // Check if the user has an existing profile picture
            if ($utilisateur->photodeprofile) {
                // Delete the old profile picture if it exists
                Storage::delete($utilisateur->photodeprofile);
            }
        
            // Upload the new file
            $file = $request->file('photodeprofile');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/posts'), $filename);
            $imagePath = 'uploads/posts/' . $filename;
        
            // Update the user's profile with the new image path
            $validatedData['photodeprofile'] = $imagePath;
        } else {
            // If no file is uploaded, do not modify the existing image field
            if (!$request->hasFile('photodeprofile')) {
                unset($validatedData['photodeprofile']);
            }
        }

        if (!empty($validatedData['mdp'])) {
            $validatedData['mdp'] = Hash::make($validatedData['mdp']);
        } else {
            unset($validatedData['mdp']);
        }

        $utilisateur->update($validatedData);

        return redirect()->route('dashboard')->with('success', 'Profile updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Utilisateur $utilisateur)
    {
        //
    }
}
