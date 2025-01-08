<?php

namespace App\Http\Controllers;

use App\Models\posts;
use App\Http\Requests\StorepostsRequest;
use App\Http\Requests\UpdatepostsRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        sleep(1);
        $user = Auth::user();
        $posts = $user->posts;

        return inertia('posts/Index', [
                'posts' => $posts
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        sleep(1);
        $validatedData = $request->validate([
            'contenu' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $image= null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/posts'), $filename); 
            $image = 'uploads/posts/' . $filename; 
        }

        $validatedData['image'] = $image;

        $validatedData['utilisateur_id'] = Auth::id();

        Posts::create($validatedData);

        return redirect('dashboard')->with('success', 'Post created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(posts $posts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(posts $post) {
        sleep(1);
        return inertia('posts/Edit', [
            'post' => $post, 
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, posts $post)
    {

        $validatedData = $request->validate([
            'contenu' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            // If a new file is uploaded, delete the old one
            if ($post->image) {
                // Delete the old file
                Storage::delete($post->image);
            }
        
            // Upload the new file
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/posts'), $filename); 
            $image = 'uploads/posts/' . $filename; 
        
            // Update the post with the new image path
            $validatedData['image'] = $image;
        } else {
            // If no file is uploaded, do not modify the existing image field
            if (!$request->hasFile('image')) {
                unset($validatedData['image']);
            }
        }

        $post->update($validatedData);

        return redirect('/posts')->with('success', 'Profile updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(posts $post){

        $post->delete();

        return redirect('/posts')->with('success', 'Post deleted successfully.');;
    }
}
