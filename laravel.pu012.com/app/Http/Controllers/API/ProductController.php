<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
Use \Carbon\Carbon;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products,  200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
            JSON_UNESCAPED_UNICODE);

    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {

    }
    public function deleteproduct($id){
        $product = Product::find($id);
        if (is_null($product)){
            return $this->sendError("Product not found!");
        }
        $product->delete();
        return response()->json([
            "success" => true,
            "message" => "Product deleted successfully!",
            "data" => $product
        ]);
    }

    public function addNewProduct(Request $request){

       $name = $request->name;
       $detail = $request->detail;
       $created_at = Carbon::now();
       if($name == null || $detail == null){
           return $this->sendError("Syntax error with null!");
       }
        $product = new Product();
        $product->name = $name;
        $product->detail = $detail;
        $product->created_at = $created_at;
        $product->save();

        return response()->json([
            "success" => true,
            "message" => "Product successfully stored!",
            "data" => $product,

        ]);
    }


}
