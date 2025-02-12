<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class commentaire extends Model
{
    /** @use HasFactory<\Database\Factories\CommentairesFactory> */
    use HasFactory;

    protected $fillable = [
        'contenu',
        'utilisateur_id',  
        'post_id',
    ];

    public function post()
    {
        return $this->belongsTo(post::class, 'post_id'); 
    }

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }

}
