import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

class Read {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const products = await productsRepository.find();

    if (!products) {
      throw new AppError('Erro ao listar produtos', 400);
    }

    return products;
  }
}

export default Read;
