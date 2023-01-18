<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
Use \Carbon\Carbon;
use Validator;

class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     tags={"Product"},
     *     path="/api/products",
     *     @OA\Parameter(
     *      name="page",
     *      in="query",
     *      required=true,
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     *     @OA\Parameter(
     *      name="name",
     *      in="query",
     *      required=false,
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     *     @OA\Parameter(
     *      name="page_size",
     *      in="query",
     *      required=false,
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     *     @OA\Response(response="200", description="List Products.")
     * )
     */
    public function index(Request $request)
    {
        $input = $request->all();
        $name = isset($input['name']) ? $input["name"] : "";
        $page_size = isset($input['page_size']) ? $input["page_size"] : 2;

        $prodcuts = Product::where('name', 'LIKE', "%$name%")->paginate($page_size);
        return response()->json($prodcuts, 200,
            ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
            JSON_UNESCAPED_UNICODE);
    }

    /**
     * @OA\Get(
     *     tags={"Product"},
     *     path="/api/products/{id}",
     *      @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Buscar por estado",
     *         required=true,
     *      ),
     *     @OA\Response(response="200", description="List Products.")
     * )
     */
    public function show($id)
    {
        $product = Product::find($id);
        if (is_null($product)) {
            return response()->json([
                "success" => false
            ], 404);
        }
        return response()->json([
            "success" => true,
            "message" => "Product retrieved successfully.",
            "data" => $product
        ]);
    }

    /**
     * @OA\Put (
     ** path="/api/products",
     *   tags={"Product"},
     *
     * @OA\RequestBody(
     *    required=true,
     *    description="Create product info",
     *    @OA\JsonContent(
     *       required={"id","name","detail"},
     *       @OA\Property(property="id", type="integer"),
     *       @OA\Property(property="name", type="string"),
     *       @OA\Property(property="detail", type="string"),
     *    ),
     * ),
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *   @OA\Response(
     *      response=400,
     *      description="Bad Request"
     *   ),
     *   @OA\Response(
     *      response=404,
     *      description="not found"
     *   ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     *)
     **/
    public function update(Request $request)
    {
        $input = $request->all();
        $id = $input['id'] ?? 0;
        $product = Product::find($id);
        if (is_null($product)) {
            return response()->json([
                "success" => false
            ], 404);
        }
        $validator = Validator::make($input, [
            'name' => 'required',
            'detail' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "Validation Error" => $validator->errors()
            ], 404);
        }
        $product->name = $input['name'];
        $product->detail = $input['detail'];
        $product->save();
        return response()->json([
            "success" => true,
            "message" => "Product updated successfully.",
            "data" => $product
        ]);
    }

    /**
     * @OA\Delete  (
     ** path="/api/products/{id}",
     *   tags={"Product"},
     *
     *  @OA\Parameter(
     *      name="id",
     *      in="path",
     *      description="Buscar por estado",
     *      required=true,
     *   ),
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *   @OA\Response(
     *      response=400,
     *      description="Bad Request"
     *   ),
     *   @OA\Response(
     *      response=404,
     *      description="not found"
     *   ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     *)
     **/
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
    /**
     * @OA\Post(
     ** path="/api/products",
     *   tags={"Product"},
     *
     *
     * @OA\RequestBody(
     *    required=true,
     *    description="Create product info",
     *    @OA\JsonContent(
     *       required={"name","detail"},
     *       @OA\Property(property="name", type="string"),
     *       @OA\Property(property="detail", type="string"),
     *    ),
     * ),
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *   @OA\Response(
     *      response=400,
     *      description="Bad Request"
     *   ),
     *   @OA\Response(
     *      response=404,
     *      description="not found"
     *   ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     *)
     **/
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
