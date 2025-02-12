<?php

namespace App\Http\Controllers;

use App\Models\commentaire;
use App\Models\post;

use App\Models\Utilisateur;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CommentairesController extends Controller
{
    /**
     * Display a listing of the resource.
      */
    // public function index($postId){
    // $post = Posts::with('commentaires')->findOrFail($postId);
    
    // return inertia('commentaires/Index', [
    //     'post' => $post,
    //     'comments' => $post->commentaires
    // ]);

    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, post $post)
    {
        $validatedData = $request->validate([
            'contenu' => 'required|string',
        ]);

        commentaire::create([
            'contenu' => $validatedData['contenu'],
            'utilisateur_id' => Auth::id(), // Ensure you get the authenticated user's ID
            'post_id' => $post->id, // Post ID for the associated post
        ]);
    
        return inertia('commentaires/Show', [
            'post' => $post,
            'comments' => $post->commentaires()->with('utilisateur')->get(),
        ])->with('success', 'Votre commentaire a été ajouté!');
    }

    /**
     * Display the specified resource.
     */
    public function show(post $post)
    {
        $comments = $post->commentaires()->with('utilisateur')->get();

        return Inertia::render('commentaires/Show', [
            'post' => $post,
            'comments' => $comments,
        ]);
    }
    
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(commentaire $commentaires)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, commentaire $commentaires)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(commentaire $commentaires)
    {
        //
    }
}
