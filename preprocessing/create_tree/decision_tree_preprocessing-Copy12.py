# coding: utf-8

import re

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import pydotplus
from IPython.display import Image
from sklearn.externals.six import StringIO
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.tree import export_graphviz


def make_attribute_plots(gini_split_df, filename):
    oFig1 = plt.figure(1, figsize=(20, 80))
    #     filename = 'node0'

    plot_index = 1
    for index, row in gini_split_df.iterrows():
        print(row['column_name'], row['gini_split'])
        new = oFig1.add_subplot(20, 2, plot_index)
        temp_class_name = row['column_name']
        print(temp_class_name)
        unique_col_value = row['column_value']
        gini_score = row['gini_score']
        gini_split = row['gini_split']
        values = row['distribution']
        new.bar(class_names, values)
        new.set_title(temp_class_name + " is " + str(
            unique_col_value) + ", gini: " + f'{gini_score:.2f}' + ", gini split: " + f'{gini_split:.2f}', fontsize=40)
        plot_index += 1

    oFig1.savefig("../../d3/static_tree/python_plots/" + filename, pad_inches=0.4, bbox_inches="tight")
    plt.show()


def make_gini_df(df_class):
    gini_df = pd.DataFrame()
    # iterating through every column in datafarme
    plot_index = 1

    class_names = ['Mammal', 'Bird', 'Fish', 'Bug', 'Invertebrate', 'Reptile', 'Amphibian']

    for temp_class_name in df_class.columns:
        unique_col_values = list(df_class[temp_class_name].unique())
        unique_col_values.sort()

        if unique_col_values == [0, 1]:
            # for a given column; plot distribution for every possible value

            gini_split = 0
            num_at_record = df_class.shape[0]
            for i in range(0, len(unique_col_values)):
                unique_col_value = unique_col_values[i]
                temp_df = df_class[df_class[temp_class_name] == unique_col_value]
                values = []
                gini_score = 1.0
                num_at_child = float(temp_df.shape[0])
                for class_name in class_names:
                    count = temp_df[temp_df['class_name'] == class_name].shape[0]
                    gini_score -= (float(count) / num_at_child) ** 2
                    values.append(count)

                gini_split += gini_score * (num_at_child / num_at_record)
                plot_index += 1
                temp_row = {'column_name': temp_class_name, 'column_value': unique_col_value, 'gini_score': gini_score,
                            'num_at_child': num_at_child, 'num_at_record': num_at_record, 'distribution': values}
                gini_df = gini_df.append(temp_row, ignore_index=True)
    return gini_df


def make_gini_split_df(gini_df):
    num_at_record = dfc.shape[0]

    # create gini split df
    gini_df['proportion'] = gini_df['num_at_child'] * gini_df['gini_score']
    gini_splits = gini_df.groupby('column_name')['proportion'].sum() / num_at_record
    gini_split_df = gini_splits.reset_index().sort_values('proportion').rename(index=str,
                                                                               columns={'proportion': 'gini_split'})

    gini_split_df = gini_split_df[['column_name', 'gini_split']]
    gini_split_df = gini_df.merge(gini_split_df, on='column_name').sort_values(['gini_split', 'column_value'])
    return gini_split_df


def make_tornado_subplot(subset, oFig1, plot_index, temp_attribute):
    row0 = subset.iloc[0]
    row1 = subset.iloc[1]
    row = row0

    lows_list = [-x for x in row0['distribution']]
    values_list = row1['distribution']
    variables = ['Mammal', 'Bird', 'Fish', 'Bug', 'Invertebrate', 'Reptile', 'Amphibian'][::-1]

    base = 0

    lows = np.array(
        lows_list
    )

    values = np.array(
        values_list
    )

    ###############################################################################
    # The actual drawing part

    # The y position for each variable
    ys = range(len(values))[::-1]  # top to bottom

    # colors = 'red orange yellow green blue purple brown'.split()
    colors = ['#db5f57', '#dbd057', '#75db57', '#57dbaa', '#579bdb', '#8557db', '#db57c0']
    # Plot the bars, one by one
    plt = oFig1.add_subplot(20, 1, plot_index)
    for y, low, value, color in zip(ys, lows, values, colors):
        # The width of the 'low' and 'high' pieces
        low_width = base - low
        high_width = value

        # Each bar is a "broken" horizontal bar chart
        plt.broken_barh(
            [(low, low_width), (base, high_width)],
            (y - 0.4, 0.8),
            facecolors=[color, color],  # Try different colors if you like
            edgecolors=['black', 'black'],
            linewidth=1,
        )

        # Display the value as text. It should be positioned in the center of
        # the 'high' bar, except if there isn't any room there, then it should be
        # next to bar instead.
        x = base + high_width / 2
        if x <= base + 50:
            x = base + high_width + 50
        plt.text(50, y, variables[y], va='center', ha='center', fontsize=40)

    # Draw a vertical line down the middle
    plt.axvline(base, color='black')

    # Position the x-axis on the top, hide all the other spines (=axis lines)

    axes = plt
    plt.spines['left'].set_visible(False)
    axes.spines['right'].set_visible(False)
    axes.spines['bottom'].set_visible(False)
    axes.xaxis.set_ticks_position('top')

    # Make the y-axis display the variables
    #     plt.yticks(ys, variables)

    # Set the portion of the x- and y-axes to show
    plt.set_xlim(base - 50, base + 50)
    plt.set_ylim(-1, len(variables))

    plt.set_title("plot number" + str(plot_index))
    # plt.set_yticks(ys, variables, fontsize=20)

    gini_split = row['gini_split']

    new = plt
    new.set_title(temp_attribute + " is " + "gini split: " + f'{gini_split:.2f}', fontsize=40)
    return "hi"


def make_tornado_plot(gini_split_df, filename):
    # filename = 'tornado'
    oFig1 = plt.figure(1, figsize=(20, 200))
    index = 1



    for x in gini_split_df['column_name'].unique():
        if index > 3:
            break
        print(x)
        subset = gini_split_df[gini_split_df['column_name'] == x]
        make_tornado_subplot(subset, oFig1, index, x)
        index += 1
    oFig1.savefig("../../d3/static_tree/python_plots/" + filename + '.png', pad_inches=0.4, bbox_inches="tight")
    plt.show()

def turn_df_into_tornado_plot(dfc_subset, plot_name):
    gini_df = make_gini_df(dfc_subset)
    gini_split_df = make_gini_split_df(gini_df)
    make_tornado_plot(gini_split_df, plot_name)

def get_node_string(orig):
    print(orig)

    # parse and retrieve value
    node_name = re.search('^\d+', orig).group(0)
    samples = re.search('samples = (\d+)', orig).group(1)
    gini = re.search('gini = (\d+.\d+)', orig).group(1)
    class_name = re.search('class = (\w+)', orig).group(1)
    color = re.search('fillcolor=(.+")', orig).group(1)
    value = re.search('value = (.+]),', orig).group(1)
    new_value = value.replace('[', '').replace(']', '').split(",")

    plot_class_names = list(class_only['class_name'])
    _X = np.arange(len(plot_class_names))
    plot_name = 'plots/' + 'gini' + str(node_name) + '.png'
    temp_row = {'current_node': node_name, 'gini': gini, 'samples': samples, 'class_name': class_name, 'color': color,
                'value': value, 'plot_name': plot_name}

    # check if gini is in the first result
    s = orig.split(',')
    pattern = 'gini'
    gini_match = re.search(pattern, s[0])

    if gini_match is None:
        attribute = s[0].split("[")[1]
        temp_row['attribute'] = attribute
    return (temp_row)


original_df = pd.read_csv('../../data/zoo-animal-classification/zoo.csv', index_col=False)
class_names_df = pd.read_csv('../../data/zoo-animal-classification/class.csv', index_col=False)
class_only = class_names_df[['Class_Number', 'Class_Type']]
class_only = class_only.rename(columns={'Class_Number': 'class_type', "Class_Type": "class_name"})
df = pd.merge(original_df, class_only, on='class_type', how='outer')
y = df['class_name']

dfc = df.copy()

# make train test split
X_train, X_test, y_train, y_test = train_test_split(df, y, test_size=0.33, random_state=1)
X_test_with_animal_name = X_test.copy()

dfc = X_train.copy()
del X_train['animal_name']
del X_test['animal_name']

# delete extra columns with class label
del X_train['class_name']
del X_train['class_type']
del X_test['class_name']
del X_test['class_type']

# train decision tree
dtree = DecisionTreeClassifier()
dtree.fit(X_train, y_train)
y_pred = dtree.predict(X_test)
accuracy_score(y_test, y_pred)
dot_data = StringIO()
class_names = list(class_only['class_name'].unique())
class_names.sort()



export_graphviz(dtree, out_file=dot_data,
                filled=True, rounded=True,
                special_characters=True, proportion=False, feature_names=X_train.columns, node_ids=False,
                class_names=class_names)

graph = pydotplus.graph_from_dot_data(dot_data.getvalue())
Image(graph.create_png())

X_test_with_animal_name['y_pred'] = y_pred
X_test_with_animal_name['y_test'] = y_test

del dfc['animal_name']



# making class distribution plots
# #layer 1
gini_df = make_gini_df(dfc)
gini_split_df = make_gini_split_df(gini_df)
make_tornado_plot(gini_split_df, 'node0')


#layer 2
df_milk_is_1 = dfc[dfc['milk'] == 1]
gini_df = make_gini_df(df_milk_is_1)
gini_split_df = make_gini_split_df(gini_df)
make_tornado_plot(gini_split_df, 'node14')

df_milk_is_0 = dfc[dfc['milk'] == 0]
gini_df = make_gini_df(df_milk_is_0)
gini_split_df = make_gini_split_df(gini_df)
make_tornado_plot(gini_split_df, 'node1')

#layer 3
# old_conditions = (dfc['milk']==0)
# parent_condition = (dfc['feathers'] == 0)
# conditions = old_conditions & parent_condition
# gini_df = make_gini_df(dfc[conditions])
# gini_split_df = make_gini_split_df(gini_df)
# make_tornado_plot(gini_split_df, 'node2')
#
# old_conditions = (dfc['milk']==0)
# parent_condition = (dfc['feathers'] == 1)
# conditions = old_conditions & parent_condition
# gini_df = make_gini_df(dfc[conditions])
# gini_split_df = make_gini_split_df(gini_df)
# make_tornado_plot(gini_split_df, 'node13')




# #layer 4
# old_conditions = (dfc['milk']==0) & (dfc['feathers'] == 0)
#
# current_condition = (dfc['fins'] == 0)
# conditions = old_conditions & current_condition
# gini_df = make_gini_df(dfc[conditions])
# gini_split_df = make_gini_split_df(gini_df)
# make_tornado_plot(gini_split_df, 'node3')
#
# current_condition = (dfc['fins'] == 1)
# conditions = old_conditions & current_condition
# turn_df_into_tornado_plot(dfc[conditions], 'node12')


# #layer 5
# old_conditions = (dfc['milk']==0) & (dfc['feathers'] == 0) & (dfc['fins']==0)
#
# current_condition = (dfc['backbone'] == 0)
# conditions = old_conditions & current_condition
# turn_df_into_tornado_plot(dfc[conditions], 'node4')
#
# current_condition = (dfc['backbone'] == 1)
# conditions = old_conditions & current_condition
# turn_df_into_tornado_plot(dfc[conditions], 'node9')
#
# #layer 6
# old_conditions = (dfc['milk']==0) & (dfc['feathers'] == 0) & (dfc['fins']==0) & (dfc['backbone']==0)
#
# current_condition = (dfc['predator'] == 0)
# conditions = old_conditions & current_condition
# turn_df_into_tornado_plot(dfc[conditions], 'node5')
#
# current_condition = (dfc['predator'] == 1)
# conditions = old_conditions & current_condition
# turn_df_into_tornado_plot(dfc[conditions], 'node6')


# make string representation of model
dot_string = dot_data.getvalue()
x = dot_string.replace("&le;", "<=")  # .replace("&#35;", "->")
x = x.replace("\n", "")
x = x.replace("<br/>", ",")
x = x.replace("label=<", "")
x = x.split(";")
x = x[2:-1]

edge_list = []
node_list = []
element_regex = re.compile(r'.+->.+')
for i in x:
    if element_regex.match(i):
        edge_list.append(i)
    else:
        node_list.append(i)

edge_df = pd.DataFrame(columns=['current_node', 'parent_node'])
for i in range(0, len(edge_list)):
    print(edge_list[i])
    pattern = "(\d+)"
    a = re.findall(pattern, edge_list[i])
    source = a[0]
    destination = a[1]
    edge_df = edge_df.append({'current_node': destination, 'parent_node': source}, ignore_index=True)

x = np.arange(10)

ult_df = pd.DataFrame(
    columns=['current_node', 'attribute', 'gini', 'samples', 'value', 'class_name', 'color', 'plot_name'])

ult_list = {}
for i in range(0, len(node_list)):
    print(node_list[i])
    (node_string) = get_node_string(node_list[i])
    ult_df = ult_df.append(node_string, ignore_index=True)
new_df = ult_df.merge(edge_df, on='current_node', how='outer')

# adding chldren columns
child_df = edge_df.groupby('parent_node').agg({'current_node': lambda x: list(x)}).reset_index()
child_df.rename(index=str, columns={"parent_node": "current_node", "current_node": "child_nodes"}, inplace=True)
new_df = new_df.merge(child_df, on='current_node', how='outer')

full_string = ""
for index, row in new_df.iterrows():
    node_name = row['current_node']
    attribute = row['attribute']
    samples = row['samples']
    class_name = row['class_name']
    value = row['value']
    gini = row['gini']
    child_nodes = row['child_nodes']

    myorder = [5, 1, 3, 2, 4, 6, 0]
    print(value)
    print(type(value))
    value = value.replace('[', '').replace(']', '').split(',')
    value = [int(value[i]) for i in myorder]
    print(value)

    parent_node = row['parent_node']

    if node_name == '0':
        result = (
            f'{{"name": "node{str(node_name)}", "attribute": "{attribute}",'
            f'"samples": {samples}, "distribution": {value}, "children": {child_nodes}}},'
        )
    else:
        parent = row['parent_node']
        result = (
            f'{{"name": "node{str(node_name)}", "attribute": "{attribute}", "parent": {parent_node},'
            f'"samples": {samples}, "distribution": {value}, "children": {child_nodes}}},'
        )
    full_string += result

first_part = 'var treeData = {'
last_part = "}"
whole_string = first_part + full_string + last_part
text_file = open("new_tree.js", "w")
text_file.write(whole_string)
text_file.close()

plt.close("all")
print(whole_string)
