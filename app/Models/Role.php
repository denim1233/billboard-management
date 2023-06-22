<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cookie;

class Role extends Model
{
    use HasFactory;
    protected $table = 'cms_roles';
    protected $fillable = ['role_name','role_description','status_id'];
    
    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            
            $model->created_by = Cookie::get('user_id');
            $model->updated_by = NULL;
        });

        static::updating(function ($model) {
            $model->updated_by = Cookie::get('user_id');
        });
    }

    protected $casts = [
        'created_at' => 'datetime:Y-m-d\ H:i:s a',
        'updated_at' => 'datetime:Y-m-d\ H:i:s a',
        'deleted_at' => 'datetime:Y-m-d\ H:i:s a',
    ];

}
