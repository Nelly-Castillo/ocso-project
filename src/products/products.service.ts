import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from "uuid";

@Injectable()
export class ProductsService {
  private  products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Sabritas Normal 30g",
      price: 29,
      countSeal: 3,
      provider: uuid()
    },
    {
      productId: uuid(),
      productName: "Coca Cola 600ml",
      price: 9,
      countSeal: 30,
      provider: uuid()
    },
    {
      productId: uuid(),
      productName: "Agua Ciel 1.5L",
      price: 20,
      countSeal: 3,
      provider: uuid()
    }
  ]
  create(createProductDto: CreateProductDto) {
    if (!createProductDto.productId) createProductDto.productId = uuid()
    createProductDto.productId = uuid();
    this.products.push(createProductDto)
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.filter((product) => product.productId === id)[0];
    if(product) {
      throw new NotFoundException();
    }
    return product;
  }

  findByProvider(id: string){
    const product = this.products.filter((product) => product.provider === id);
    if(product.length === 0) {
      throw new NotFoundException();
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let productUp = this.findOne(id);
    productUp = {
      ... productUp,
      ... updateProductDto
    }
    if(productUp) throw new NotFoundException();
    this.products = this.products.map((product) => {
      if (product.productId === id) {
        product = productUp
      }
      return product
    })
    return productUp;
  }

  remove(id: string) {
    const {productId} = this.findOne(id)
    this.products =  this.products.filter((product) => product.productId !== id)
    return this.products; 
  }
}
