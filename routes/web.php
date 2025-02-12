<?php

use App\Http\Controllers\CommentairesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\UtilisateurController;
use Illuminate\Support\Facades\Route;


Route::get('/',[UtilisateurController::class, 'index']);

Route::resource('utilisateurs', UtilisateurController::class)->except('index');


Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'login']);

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard')->middleware('auth');
Route::post('/logout', [DashboardController::class, 'logout'])->middleware('auth');


Route::resource('posts', PostsController::class);

Route::resource('commentaires', CommentairesController::class);
Route::get('/posts/{post}/comments', [CommentairesController::class, 'show'])->name('posts.show.comments');
Route::post('/posts/{post}/comments', [CommentairesController::class, 'store'])->name('posts.comments.store');