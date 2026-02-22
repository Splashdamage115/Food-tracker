import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/food_item.dart';
import '../models/food_log.dart';
import '../services/food_service.dart';
import '../providers/food_log_provider.dart';

class AddFoodScreen extends StatefulWidget {
  const AddFoodScreen({super.key});

  @override
  State<AddFoodScreen> createState() => _AddFoodScreenState();
}

class _AddFoodScreenState extends State<AddFoodScreen> {
  final _foodService = FoodService();
  final _searchController = TextEditingController();
  List<FoodItem> _searchResults = [];
  bool _isSearching = false;
  FoodItem? _selectedFood;
  final _servingsController = TextEditingController(text: '1.0');
  String _selectedMealType = 'breakfast';

  @override
  void dispose() {
    _searchController.dispose();
    _servingsController.dispose();
    super.dispose();
  }

  Future<void> _searchFoods(String query) async {
    if (query.isEmpty) {
      setState(() {
        _searchResults = [];
      });
      return;
    }

    setState(() {
      _isSearching = true;
    });

    final results = await _foodService.searchFoods(query);

    setState(() {
      _searchResults = results;
      _isSearching = false;
    });
  }

  Future<void> _addFoodLog() async {
    if (_selectedFood == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select a food item')),
      );
      return;
    }

    final servings = double.tryParse(_servingsController.text);
    if (servings == null || servings <= 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter a valid serving size')),
      );
      return;
    }

    final log = FoodLog(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      food: _selectedFood!,
      servings: servings,
      mealType: _selectedMealType,
      date: Provider.of<FoodLogProvider>(context, listen: false).selectedDate,
    );

    await Provider.of<FoodLogProvider>(context, listen: false).addLog(log);

    if (mounted) {
      Navigator.of(context).pop();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Food logged successfully!'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Food'),
      ),
      body: Column(
        children: [
          // Search bar
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Search foods...',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: _searchController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          _searchController.clear();
                          _searchFoods('');
                        },
                      )
                    : null,
                border: const OutlineInputBorder(),
              ),
              onChanged: _searchFoods,
            ),
          ),

          // Search results or food details
          Expanded(
            child: _selectedFood != null
                ? _buildFoodDetails()
                : _buildSearchResults(),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchResults() {
    if (_isSearching) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_searchController.text.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.search,
              size: 64,
              color: Colors.grey[400],
            ),
            const SizedBox(height: 16),
            Text(
              'Search for foods to track',
              style: TextStyle(
                fontSize: 18,
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
      );
    }

    if (_searchResults.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.sentiment_dissatisfied,
              size: 64,
              color: Colors.grey[400],
            ),
            const SizedBox(height: 16),
            Text(
              'No foods found',
              style: TextStyle(
                fontSize: 18,
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      itemCount: _searchResults.length,
      itemBuilder: (context, index) {
        final food = _searchResults[index];
        return Card(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: Theme.of(context).primaryColor.withOpacity(0.1),
              child: Icon(
                Icons.restaurant,
                color: Theme.of(context).primaryColor,
              ),
            ),
            title: Text(food.name),
            subtitle: Text(
              '${food.brand ?? 'Generic'} • ${food.servingSize} • ${food.calories.toInt()} cal',
            ),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              setState(() {
                _selectedFood = food;
              });
            },
          ),
        );
      },
    );
  }

  Widget _buildFoodDetails() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Back button
          TextButton.icon(
            onPressed: () {
              setState(() {
                _selectedFood = null;
              });
            },
            icon: const Icon(Icons.arrow_back),
            label: const Text('Back to search'),
          ),
          const SizedBox(height: 16),

          // Food info card
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _selectedFood!.name,
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '${_selectedFood!.brand ?? 'Generic'} • ${_selectedFood!.servingSize}',
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: Colors.grey[600],
                    ),
                  ),
                  const Divider(height: 32),
                  Text(
                    'Nutrition Facts',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  _buildNutrientRow('Calories', '${_selectedFood!.calories.toInt()}', 'kcal'),
                  _buildNutrientRow('Protein', '${_selectedFood!.protein.toStringAsFixed(1)}', 'g'),
                  _buildNutrientRow('Carbs', '${_selectedFood!.carbs.toStringAsFixed(1)}', 'g'),
                  _buildNutrientRow('Fat', '${_selectedFood!.fat.toStringAsFixed(1)}', 'g'),
                  if (_selectedFood!.fiber != null)
                    _buildNutrientRow('Fiber', '${_selectedFood!.fiber!.toStringAsFixed(1)}', 'g'),
                  if (_selectedFood!.sugar != null)
                    _buildNutrientRow('Sugar', '${_selectedFood!.sugar!.toStringAsFixed(1)}', 'g'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Servings input
          Text(
            'Servings',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          TextField(
            controller: _servingsController,
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              suffixText: 'servings',
            ),
          ),
          const SizedBox(height: 24),

          // Meal type selector
          Text(
            'Meal Type',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          SegmentedButton<String>(
            segments: const [
              ButtonSegment(value: 'breakfast', label: Text('Breakfast')),
              ButtonSegment(value: 'lunch', label: Text('Lunch')),
              ButtonSegment(value: 'dinner', label: Text('Dinner')),
              ButtonSegment(value: 'snack', label: Text('Snack')),
            ],
            selected: {_selectedMealType},
            onSelectionChanged: (Set<String> selection) {
              setState(() {
                _selectedMealType = selection.first;
              });
            },
          ),
          const SizedBox(height: 32),

          // Add button
          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton(
              onPressed: _addFoodLog,
              child: const Text(
                'Add to Log',
                style: TextStyle(fontSize: 16),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNutrientRow(String label, String value, String unit) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: const TextStyle(fontSize: 16),
          ),
          Text(
            '$value $unit',
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}
