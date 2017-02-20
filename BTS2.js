//Author: Radu Molea


//node to be used by tree
function Node(data, left, right){
	this.data = data;
	this.left = left;
	this.right = right;
	this.getData = getData;
}

function getData(){
	return this.data;
}
//tree 
function Tree(){
	this.root = undefined; //this will be a node
	this.isEmpty = isEmpty;  //isEmpty()
	this.isLeaf = isLeaf;    //isLeaf()
	this.insert = insert;    //insert(value)
	this.insertH = insertH;
	this.remove = remove;    //remove(value) removes the subtree rooted at value
	this.contains = contains;  //contains(value)
	this.findLargest = findLargest;  //findLargest()
	this.findSmallest = findSmallest;  //findSmallest()
	this.copy = copy;           //copy()
	this.toString = toString;  //toString()
	this.treeMap = treeMap;   //treeMap(operation)
	//test() = test; //test function
}


//function checks if a tree is empty or not
function isEmpty(){
	if (this.root === undefined){    //main condition for a tree to be empty
		console.log("the list is empty");  
		return true;
	}else {
		console.log("the list is not empty");
		return false;
	}
}

//function checks if a any specific tree's root is a leaf 
function isLeaf(){
	if(this.root === undefined){
		console.log("Is not a node");
		return;
	}else{       				//checks if the node doesn't have children
		if(this.root.left === undefined && this.root.right === undefined){ 
			console.log("is leaf");
			return true;
		}else{
			console.log("is not leaf");
			return false;
		}
	}
}
//main insert function 
function insert(value){
	if(typeof value === "number"){  //if argument is a number
		this.insertH(value);        //calls the helper insert function
	}else{
		for(var i=0; i<value.length; i++){  //if argument is an array
			this.insertH(value[i]);        //calls helper func. for each num in array
		}
	}
}
//helper insert function
//takes a number as argument and creates a node with it 
//and puts the node in the right place in the tree
function insertH(value){
	var newNode = new Node(value, undefined, undefined); //create node
	if(this.root === undefined){  //checks if tree is empty
		this.root = newNode;    //if empty assigns the node to be the tree root
	}else {                          //function used to find spot for node in tree:     
		var recursive = function(node){ //will be called with node = this.root
			if(value == node.data){    //start with first node see if the same
				console.log("Can't insert duplicate data"); //is the same stops
			}else if(value < node.data){   //decides if to go left
				if(node.left === undefined){ //checks current child is empty(its left child from root)
					node.left = newNode;//if it is, success!assigns node to this spot and function stops here
				}else{                //in case current child is not empty    
					recursive(node.left); //assigns the current node as root and search begins again
				}                                                            //from the top of function
			}else if(value > node.data){  //decides if to go right
				if(node.right === undefined){ //same procedure as when it goes left
					node.right = newNode;    //but uses child on the right of root
				}else{
					recursive(node.right);
				}
			}
		}                      ////in case tree is not empty
		recursive(this.root); //calls the above function
	} 
}

//prints/returns a string with contents of the tree
function toString(){
	var node = this.root;
	var string = "";
	var recursive = function(node){  //function that goes through the tree recursively
		if (!(node == null)){      //will stop once stumbles upon an empty node
			recursive(node.left); //to the left
			string += node.getData() + ", ";  //takes data of current node and appends it to string
			recursive(node.right); //to the right
		}
	}
	recursive(node);  //calls the above function
	console.log(string.slice(0, string.length-2)); //prints the string
	return string;  //returns the string
}

//finds node with largest number
function findLargest(){
	var node = this.root;               //since tree is already organized
	while (!(node.right === undefined)){  //needs to go to the right most node
		node = node.right;     
	}
	console.log("The largest is: " + node.data);
	return node.data;
}
//finds node with smalest number
function findSmallest(){
	var node = this.root;             //since tree is already organized 
	while(!(node.left === undefined)){  //needs to go to the left most node
		node = node.left;
	}
	console.log("The smallest is: " + node.data);
	return node.data;
}

//function that checks if a tree contains a node with number from argument
function contains(value){
	var node = this.root;	       //uses root of current tree
	while (node.data != value){    //going to do code under until node is found
		                           //!!if root is already the node with value, it will skip entire loop
		if (value < node.data){   //so it checks if value searched is smaller than current node's value
			node = node.left;    //if it is it goes left and checks condition of while loop
		}else {                   //in case it's bigger 
			node = node.right;  //goes right 
		}
		if (node === undefined){  //will only happen if it went through the whole tree
			console.log("Does not contain " + value); //without finding the node with value
			return false;
		}
	}
	console.log("Contains " + value);
	return node;
}

//function that removes node and its subtree from tree
function remove(value){	
	var node = this.contains(value); //finds the node with number value from argument
	var delette = function(node){   //create function that will delete actual node and subtree
		node.data = undefined;     //so the actual node data is erased
		if(!(node.left==null)){   //if the node has children
			delette(node.left);   //does same with all children left and right
		}if(!(node.right==null)){
			delette(node.right);
		}else{return;}    //will stop once node doesnt have any more children
	}
	if(node != false){      //if desired node exists
		console.log(value + " has been removed"); //will print
	}
	delette(node); //calls above function
}   

//creates a new tree with values from original tree
function copy(){
	var node = this.root; //takes root of curent tree
	var copi = function(node){  //actual function that creates new node for each node
		if(node == null){  //base case when node is null it stops
			return null;
		}
		var left = copi(node.left);  //will go left
		var right = copi(node.right); //will go right
		var newNode = new Node(node.data, left, right); //so ends up doing this for each node
		return newNode; //and returns each new node
	}
	var newTree = new Tree(); //new tree object
	newTree.root = copi(node);  //calls and assigns nodes to new tree objects
	return newTree;
}

//performs certain operation to each node's data from tree 
function treeMap(operation){
	node = this.root;
	var maping = function(node){   //actual function
		node.data = operation(node.data); //base case, takes data from node and does operation
		if(!(node.left==null)){  //checks for left child
			maping(node.left)    //if there is, the function recursivley called with it as argument
		}if(!(node.right==null)){  //same but for right child
			maping(node.right);
		}else{return;}  //if no left or right children it stops
	}
	maping(node); //calls the maping function 
}

//function to test above code
Tree.prototype.test = function(){
	var t = new Tree();
	t.isEmpty();
	t.isLeaf();
	t.toString();
	t.insert(50);
	t.insert(40);
	t.insert(50); 
	t.insert(60);
	t.toString();
	t.contains(50);
	t.contains(60);
	t.insert([22, 44, 34, 60, 23, 70, 80,82,65]);	
	t.toString();
	t.isEmpty();
	t.isLeaf();
	t.contains(34);
	t.contains(123);
	t.toString();
	t.findLargest();
	t.findSmallest();
	var newTree = t.copy();
	newTree.toString();
	var square = function(x){return x*x;}
	t.treeMap(square);
	t.toString();
	newTree.toString();
	t.toString();
	t.remove(40);
	t.toString();
	t.remove(1600);
	t.toString();
}

module.exports.Tree = Tree;
