<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class posts extends Model
{
    /** @use HasFactory<\Database\Factories\PostsFactory> */
    use HasFactory;


    protected $fillable = [
        'contenu',
        'image',
        'utilisateur_id',
    ];

    
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function likes()
    {
        return $this->hasMany(likes::class);
    }

    public function comments()
    {
        return $this->hasMany(commentaires::class);
    }
}
